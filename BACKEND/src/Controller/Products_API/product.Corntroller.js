// const PublicAuthSchema = require("../../Schema/Public.Auth.Schema");
// const SellerAuhSchema = require("../../Schema/Seller.Auth.Schema");
const ProductSchema = require("../../Schema/Seller.Product.Schema");
const ApiFeature = require("../../Utils/ApiFeatures");
const asyncHandler = require("../../Utils/asyncHandler");
const calculatePagination = require("../../Utils/calculatePagination");

const Product = {
  AllProduct: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const products = new ApiFeature(ProductSchema, req.query)
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const product = await products.query;

    const totalProductsCount = await ProductSchema.find({}).countDocuments();
    const totalPage = Math.ceil(totalProductsCount / limit);
    const { prevPages, nextPages, hasOwnPage } = calculatePagination(
      page,
      totalPage,
      product
    );

    // path: req.url,
    // totalProducts: count,
    // productperPage: products.length,
    // pagePerLimit: limit,
    // totalPages: total,
    // prevPages: prevPages,
    // nextPages: nextPages,
    // prevPage: page === 1 ? 1 : page - 1,
    // nextPage: page + 1,
    // page: page,
    // hasOwnPage,
    // products,
    res.status(200).json({
      path: req.url,
      totalProducts: totalProductsCount,
      productperPage: product.length,
      pagePerLimit: limit,
      totalPages: totalPage,
      prevPages: prevPages,
      nextPages: nextPages,
      prevPage: page === 1 ? 1 : page - 1,
      nextPage: page + 1,
      page: page,
      hasOwnPage,
      status: true,
      products: product,
    });
  }),
  getProduct: asyncHandler(async (req, res) => {
    const product = await ProductSchema.findById({
      _id: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        status: false,
        errorMessage: "not found",
      });
    }
    const products = await ProductSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { views: 1 },
      }
    );
    // product.views += 1;
    await products.save();
    res.status(200).json({
      status: true,
      length: product.length,
      data: product,
    });
  }),
  Category: asyncHandler(async (req, res) => {
    const category = [];
    const product = await ProductSchema.aggregate([
      {
        $group: {
          _id: "$category.category",
          subcategories: { $addToSet: "$category.subCategory" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: 1,
        },
      },
      {
        $sort: { category: 1 }, // Sort categories in ascending order
      },
      {
        $unwind: "$subcategories",
      },
      {
        $sort: { subcategories: 1 }, // Sort subcategories in ascending order
      },
      {
        $group: {
          _id: "$category",
          subcategories: { $push: "$subcategories" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: 1,
        },
      },
      {
        $sort: { category: 1 }, // Ensure categories are sorted again if necessary
      },
    ]);
    if (!product) {
      return res.status(404).json({
        status: false,
        errorMessage: "not found",
      });
    }

    // product[0].category.forEach((elm) => {
    //   category.push(elm);
    // });

    res.status(200).json({
      status: true,
      path: req.path,
      product,
    });
  }),
  getSubcategory: asyncHandler(async (req, res) => {
    const subcategory = [];
    const params = req.params.category;
    const product = await ProductSchema.aggregate([
      {
        $unwind: "$category",
      },
      {
        $match: {
          "category.category": params, // Replace with the desired category
        },
      },
      {
        $group: {
          _id: {
            category: "$category.category",
            subCategory: "$category.subCategory",
          },
          productCount: {
            $sum: 1,
          },
          products: {
            $push: {
              _id: "$_id",
              title: "$title",
              brand: "$brand",
              thumbnail: "$thumbnail",
              price: "$price",
              rating: "$rating",
            },
          },
        },
      },
      {
        $addFields: {
          category: "$_id.category",
          subCategory: "$_id.subCategory",
        },
      },
      {
        $project: {
          _id: 0,
          category: 1,
          subCategory: 1,
          productCount: 1,
          products: 1,
          inWhiteList: 1,
        },
      },
      {
        $sort: {
          productCount: -1,
        },
      },
      // {
      //   $limit: 6
      // } // Uncomment this line if you want to limit the results
    ]);

    if (!product) {
      return res.status(404).json({
        status: false,
        errorMessage: "not found",
      });
    }
    res.status(200).json({
      status: true,
      length: product.length,
      product,
    });
  }),
  getdatabySubcategory: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const a = ProductSchema.aggregate([
      {
        $match: {
          // _id: ObjectId('65f02cba6687f93ae1667355'),
          "category.category": "electronics",
          "category.subCategory": "mobile",
        },
      },
      {
        $sort: {
          title: -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "publicusers",
          localField: "_id",
          foreignField: "whiteList.productId",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          inWhiteList: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: "$productDetails",
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);
    // const prod = new ApiFeature(ProductSchema, req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate()
    //   .inWhiteList();
    // const p = await prod.query;
    const totalProductsCount = await ProductSchema.find({
      "category.subCategory": {
        $regex: req.params.subcategory,
      },
      "category.category": {
        $regex: req.params.category,
      },
    }).countDocuments();
    const totalPage = Math.ceil(totalProductsCount / limit);
    const { prevPages, nextPages, hasOwnPage } = calculatePagination(
      page,
      totalPage,
      p
    );

    // if (!product) {
    //   return res.status(404).json({
    //     status: false,
    //     errorMessage: "not found",
    //   });
    // }
    res.status(200).json({
      status: true,
      path: req.url,
      totalProducts: totalProductsCount,
      productperPage: p.length,
      pagePerLimit: limit,
      totalPages: totalPage,
      prevPages: prevPages,
      nextPages: nextPages,
      prevPage: page === 1 ? 1 : page - 1,
      nextPage: page + 1,
      page: page,
      hasOwnPage,
      data: p,
    });
  }),
  getSubcategoryProduct: asyncHandler(async (req, res) => {
    const product = await ProductSchema.find({
      _id: {
        $regex: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        status: false,
        errorMessage: "not found",
      });
    }
    res.status(200).json({
      status: true,
      length: product.length,
      data: product,
    });
  }),
};

module.exports = Product;
