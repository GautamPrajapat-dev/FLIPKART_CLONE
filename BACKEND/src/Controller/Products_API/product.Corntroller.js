const PublicAuthSchema = require("../../Schema/Public.Auth.Schema");
const SellerAuhSchema = require("../../Schema/Seller.Auth.Schema");
const ProductSchema = require("../../Schema/Seller.Product.Schema");
const ApiFeature = require("../../Utils/ApiFeatures");
const asyncHandler = require("../../Utils/asyncHandler");

const Product = {
  AllProduct: asyncHandler(async (req, res) => {
    const products = new ApiFeature(ProductSchema, req.query)
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const product = await products.query;
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
  getProduct: asyncHandler(async (req, res) => {
    const product = await ProductSchema.findById({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({
        status: false,
        errorMessage: "not found",
      });
    }
    product.views += 1;
    await product.save();
    res.status(200).json({
      status: true,
      length: product.length,
      data: product,
    });
  }),
  ProductByCategory: asyncHandler(async (req, res) => {
    const category = [];
    const product = await ProductSchema.aggregate([
      { $unwind: "$category.category" },

      {
        $group: {
          _id: "",
          category: { $addToSet: "$category.category" },
          subcategory: { $addToSet: "$category.subCategory" },
        },
      },
      {
        $project: {
          _id: 0,
          category: 1,
        },
      },
    ]);
    if (!product) {
      return res.status(404).json({
        status: false,
        errorMessage: "not found",
      });
    }

    product[0].category.forEach((elm) => {
      category.push(elm);
    });

    res.status(200).json({
      status: true,
      category,
    });
  }),
  getSubcategory: asyncHandler(async (req, res) => {
    const subcategory = [];
    const product = await ProductSchema.aggregate([
      { $unwind: "$category" },
      { $match: { $or: [{ "category.category": req.params.category }] } },
      {
        $group: {
          _id: "$category.category",
          subcategory: { $addToSet: "$category.subCategory" },
        },
      },
      {
        $project: {
          _id: 0,
          subcategory: 1,
        },
      },
    ]);

    product[0].subcategory.forEach((elm) => {
      subcategory.push(elm);
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
      subcategory,
    });
    //     const movies = await Movie.aggregate([
    //         {$unwind: '$genres'},
    //         {$group: {
    //             _id: '$genres',
    //             movieCount: { $sum: 1},
    //             movies: {$push: '$name'},
    //         }},
    //         {$addFields: {genre: "$_id"}},
    //         {$project: {_id: 0}},
    //         {$sort: {movieCount: -1}},
    //         //{$limit: 6}
    //         //{$match: {genre: genre}}
    //     ]);

    //     res.status(200).json({
    //         status: 'success',
    //         count: movies.length,
    //         data: {
    //             movies
    //         }
    //     });
  }),
  getdatabySubcategory: asyncHandler(async (req, res) => {
    const product = await ProductSchema.find({
      "category.subCategory": {
        $regex: req.params.subcategory,
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

    //     const movies = await Movie.aggregate([
    //         {$unwind: '$genres'},
    //         {$group: {
    //             _id: '$genres',
    //             movieCount: { $sum: 1},
    //             movies: {$push: '$name'},
    //         }},
    //         {$addFields: {genre: "$_id"}},
    //         {$project: {_id: 0}},
    //         {$sort: {movieCount: -1}},
    //         //{$limit: 6}
    //         //{$match: {genre: genre}}
    //     ]);

    //     res.status(200).json({
    //         status: 'success',
    //         count: movies.length,
    //         data: {
    //             movies
    //         }
    //     });
  }),
};

module.exports = Product;
