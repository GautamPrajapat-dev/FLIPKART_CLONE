const ProductSchema = require("../Schema/Seller.Product.Schema");
const SellerAuhSchema = require("../Schema/Seller.Auth.Schema");
const ApiFeature = require("../Utils/ApiFeatures");
const asyncHandler = require("../Utils/asyncHandler");
const calculatePagination = require("../Utils/calculatePagination");
const { default: mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
const moment = require("moment");
const SellerProduct = {
  addNewProduct: asyncHandler(async (req, res) => {
    const {
      title,
      brand,
      qty,
      description,
      category,
      features,
      price,
      rating,
    } = req.body;
    const file = req.files;

    // upload product on cloudinary using uploader method and save in public/avatar folder
    const isSeller = SellerAuhSchema.findById({
      _id: res.Seller.sellerId,
    });
    if (!isSeller) {
      return res.status(401).json({
        status: false,
        errorMessage: "Seller is not Found",
      });
    }
    const matchTitle = await ProductSchema.findOne({
      title: { $regex: `^${title}$`, $options: "i" },
    });
    if (matchTitle) {
      res.status(406).json({
        status: false,
        errorMessage: "Title Hash Been Matched Another Product",
      });
      return false;
    }

    if (
      file.brandLogo === undefined ||
      file.thumbnail === undefined ||
      file.images === undefined
    ) {
      res.status(403).json({
        status: false,
        errorMessage: "Images Are Reqired",
      });
      return false;
    }

    if (
      title === "" ||
      qty === "" ||
      description === "" ||
      category === "" ||
      features === "" ||
      price === "" ||
      rating === ""
    ) {
      res.status(403).json({
        status: false,
        errorMessage: "Please Enter a All Details",
      });
      return false;
    }
    const brandLogo = file.brandLogo[0];

    if (brandLogo) {
      const logo = await cloudinary.uploader.upload(brandLogo.path, {
        folder: "seller/brandLogo",
        resource_type: "image",
      });
      if (logo) {
        const brand = {
          public_id: logo.public_id,
          img: logo.secure_url,
        };
        req.body.brand.logo = brand;
      } else {
        return res.status(403).json({
          status: false,
          errorMessage: "Logo Not Uploaded",
        });
      }
    } else {
      return res.status(403).json({
        status: false,
        errorMessage: "Brand Logo Not Found",
      });
    }
    const thumb = file.thumbnail[0];
    if (!thumb) {
      return res.status(403).json({
        status: false,
        errorMessage: "thumbnail Not Found",
      });
    } else {
      const thumAdd = await cloudinary.uploader.upload(thumb.path, {
        folder: "seller/thumbnail",
        resource_type: "image",
      });

      if (thumAdd) {
        const thumbData = {
          public_id: thumAdd.public_id,
          img: thumAdd.secure_url,
        };
        req.body.thumbnail = thumbData;
      } else {
        res.status(403).json({
          status: false,
          errorMessage: "thumbnail Not Uploaded",
        });
      }
    }
    const arr = [];
    for (const files of file.images) {
      const { path } = files;

      const uploadUrl = await cloudinary.uploader.upload(path, {
        folder: "seller/products",
        resource_type: "image",
      });

      if (!uploadUrl) {
        res.status(403).json({
          status: false,
          errorMessage: "images Not Uploaded",
        });
      } else {
        arr.push({
          public_id: uploadUrl.public_id,
          img: uploadUrl.secure_url,
        });
      }
    }

    if (arr) {
      const product = await ProductSchema({
        sellerId: res.Seller.sellerId,
        title: title,
        brand: brand,
        qty: qty,
        description: description,
        category: category,
        features: Boolean(features),
        price: price,
        thumbnail: req.body.thumbnail,
        images: arr,
        rating: rating,
      });
      if (product) {
        await product.save();
        res.status(200).json({
          status: true,
          successMessage: "product saved successfully",
          product: product,
        });
      } else {
        arr.forEach((image) => cloudinary.uploader.destroy(image.public_id));
        cloudinary.uploader.destroy([
          req.body.brand.logo.public_id,
          req.body.thumbnail.public_id,
        ]);
        res.status(200).json({
          status: false,
          errorMessage: "Product Has Been Not Uploaded",
        });
      }
    }
  }),
  getDashBoardDetails: asyncHandler(async (req, res) => {
    const sellerId = new mongoose.Types.ObjectId(res.Seller.sellerId); // Example seller ID
    const twoMinutesAgo = moment().subtract(2, "minutes").toDate();
    const oneDayAgo = moment().subtract(1, "day").toDate();
    const aggregatePipeline = [
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            sellerId: sellerId,
            createdAt: {
              $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
            },
          },
      },
      {
        $group: {
          _id: "$sellerId",
          totalProducts: {
            $sum: 1,
          },
          // Calculate total products
          totalViews: {
            $sum: "$views",
          },
          lastModifiedDate: {
            $max: "$updatedAt",
          },
          // Calculate total views
          viewsLast365Days: {
            $sum: {
              $cond: [
                {
                  $gt: [
                    "$updatedAt",
                    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                  ],
                },
                "$views",
                0,
              ],
            },
          },
          viewsLast30Days: {
            $sum: {
              $cond: [
                {
                  $gt: [
                    "$updatedAt",
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                  ],
                },
                "$views",
                0,
              ],
            },
          },
          viewsLast1Day: {
            $sum: {
              $cond: [
                {
                  $gt: ["$updatedAt", oneDayAgo],
                },
                "$views",
                0,
              ],
            },
          },
          // viewsLast1hour: {
          //   $sum: {
          //     $cond: [
          //       {
          //         $gt: [
          //           "$updatedAt",
          //           new Date(Date.now() - 1 * 60 * 60 * 1000),
          //         ],
          //       },
          //       "$views",
          //       0,
          //     ],
          //   },
          // },
          //  Calculate total views in the last 1 hour
          // viewsPrevious1Hour: {
          //   $sum: {
          //     $cond: [
          //       {
          //         $and: [
          //           {
          //             $lte: [
          //               "$updatedAt",
          //               new Date(Date.now() - 60 * 60 * 1000),
          //             ],
          //           },
          //           {
          //             $gt: [
          //               "$updatedAt",
          //               new Date(Date.now() - 2 * 60 * 60 * 1000),
          //             ],
          //           },
          //         ],
          //       },
          //       "$views",
          //       0,
          //     ],
          //   },
          // },
          // viewsLast2Minutes: {
          //   $sum: {
          //     $cond: [
          //       {
          //         $gte: ["$updatedAt", twoMinutesAgo],
          //       },
          //       "$views",
          //       0,
          //     ],
          //   },
          // },
          // // viewsLast2min: {
          // //   $sum: {
          // //     $cond: [
          // //       {
          // //         $and: [
          // //           {
          // //             $lte: [
          // //               "$updatedAt",
          // //               new Date(Date.now() - 2 * 60 * 1000),
          // //             ],
          // //           },
          // //           {
          // //             $gt: ["$updatedAt", new Date(Date.now() - 4 * 60 * 1000)],
          // //           },
          // //         ],
          // //       },
          // //       "$views",
          // //       0,
          // //     ],
          // //   },
          // // },
        },
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "products",
            let: {
              sellerId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $lte: ["$qty", 10],
                  }, // Filter products with less than 10 quantity
                },
              },
            ],
            as: "lessqty",
          },
      },
      {
        $project:
          /**
           * specifications: The fields to
           *   include or exclude.
           */
          {
            _id: 1,
            totalViews: 1,
            totalQtyLessThan10: 1,
            totalProducts: 1,
            totalViews: {
              viewsLast365Days: "$viewsLast365Days",
              viewsLast30Days: "$viewsLast30Days",
              // viewsLast1Day: "$viewsLast1Day",
              // viewsLast1hour: "$viewsLast1hour",
              // viewsPrevious1Hour: "$viewsPrevious1Hour",
              // viewsLast2Minutes: "$viewsLast2Minutes",
              // viewsLast2min: "$viewsLast2min",
            },
            lessqty: 1,
            lastModifiedDate: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$lastModifiedDate",
                timezone: "UTC",
              },
            },
            lastModifiedTime: {
              $dateToString: {
                format: "%H:%M:%S",
                date: "$lastModifiedDate",
                timezone: "UTC",
              },
            },
          },
      },
    ];
    await ProductSchema.aggregate(aggregatePipeline)
      .then((results) => {
        res.status(200).json({ status: true, results: results[0] });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ status: false, errorMessage: "internal server error" });
        console.error("Error:", error);
      });

    //   const api = new ApiFeature(
    //     ProductSchema.find(),
    //     req?.query,
    //     res?.Seller?.sellerId
    //   )
    //     .filter()
    //     .search()
    //     .sort();
    //   const products = await api.query;
    //   const count = await ProductSchema.find({
    //     sellerId: res?.Seller?.sellerId,
    //   }).countDocuments();
    //   const total = Math.ceil(count / req.query.limit || 3);
    //   if (products) {
    //     if (products.length === 0) {
    //       return res.status(400).json({
    //         status: false,
    //         errorMessage: "Not found",
    //       });
    //     }
    //     res.status(200).json({
    //       status: true,
    //       totalProduct: count,
    //       totalPage: total,
    //       path: req.path,
    //       length: products.length,
    //       next: Number(req.query.page) + 1,
    //       products,
    //     });
    //   } else {
    //     res.status(400).json({
    //       status: false,
    //       errorMessage: "Product Not Found",
    //     });
    //   }
  }),
  getAllproducts: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const api = new ApiFeature(
      ProductSchema.find(),
      req?.query,
      res?.Seller?.sellerId
    )
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();
    const products = await api.query;
    const count = await ProductSchema.find({
      sellerId: res?.Seller?.sellerId,
    }).countDocuments();
    const total = Math.ceil(count / limit || 3);
    const { prevPages, nextPages, hasOwnPage } = calculatePagination(
      page,
      total,
      products
    );

    const pageval = `Showing ${(page - 1) * limit + 1} to ${Math.min(
      page * limit,
      count
    )} of ${count} results`;
    if (products) {
      res.status(200).json({
        pageval,
        path: req.url,
        totalProducts: count,
        productperPage: products.length,
        pagePerLimit: (page - 1) * limit + 1,
        productsPageTo: Math.min(page * limit, count),
        totalPages: total,
        prevPages: prevPages,
        nextPages: nextPages,
        prevPage: page === 1 ? 1 : page - 1,
        nextPage: page + 1,
        page: page,
        hasOwnPage,
        status: true,
        products,
      });
    } else {
      res.status(400).json({
        status: false,
        errorMessage: "Product Not Found",
      });
    }
  }),
  getProduct: asyncHandler(async (req, res) => {
    const product = await ProductSchema.findById(
      { _id: req.params.id },
      {
        thumbnail: {
          public_id: 0,
        },
        brand: {
          logo: {
            public_id: 0,
          },
        },
        images: { public_id: 0, _id: 0 },
      }
    );
    if (product.sellerId === res.Seller.sellerId || product.sellerId !== null) {
      if (!product) {
        return res.status(400).json({
          status: false,
          errorMessage: "missing your product pelase find it",
        });
      }
      res.status(200).json({
        status: true,
        path: req.path,
        product,
      });
    } else {
      res.status(404).json({
        status: true,
        successMessage: "Product Not Found",
      });
    }
  }),
  updateProduct: asyncHandler(async (req, res) => {
    const { title, qty, description, category, features, price, rating } =
      req.body;
    // upload product on cloudinary using uploader method and save in public/avatar folder
    const sellerFind = await SellerAuhSchema.findById({
      _id: res.Seller.sellerId,
    });
    if (!sellerFind) {
      return res.status(401).json({
        status: false,
        errorMessage: "Seller is not Found",
      });
    }

    const productFind = await ProductSchema.findById({
      _id: req.params.id,
    });

    const brand = {
      public_id: productFind.brand.logo.public_id,
      img: productFind.brand.logo.img,
    };
    req.body.brand.logo = brand;

    // sellerId: res.Seller.sellerId,
    const product = await ProductSchema.updateOne(
      {
        _id: req.params.id,
      },
      {
        title: title,
        qty: qty,
        description: description,
        category: category,
        features: Boolean(features),
        price: price,
        rating: rating,
        brand: req.body.brand,
      },
      { new: true }
    );
    if (product) {
      res.status(200).json({
        status: true,
        successMessage: "product Update successfully",
      });
    } else {
      res.status(400).json({
        status: false,
        errorMessage: "Product Has Been Not Uploaded",
      });
    }
  }),
  deleteProduct: asyncHandler(async (req, res) => {
    const prodcutIdFind = await ProductSchema.findById({
      _id: req.params.id,
    });

    if (!prodcutIdFind) {
      return res.status(404).json({
        status: false,
        errorMessage: "product not found with id",
      });
    } else {
      const p1 = prodcutIdFind.images.forEach(
        async (image) => await cloudinary.uploader.destroy(image.public_id)
      );
      const p2 = await cloudinary.uploader.destroy(
        prodcutIdFind.brand.logo.public_id
      );
      const p3 = await cloudinary.uploader.destroy(
        prodcutIdFind.thumbnail.public_id
      );
      if (p1 || p2 || p3) {
        await ProductSchema.deleteOne({ _id: prodcutIdFind._id });
        res.status(200).json({
          status: true,
          successMessage: "Deleted",
        });
      } else {
        res.status(400).json({
          status: false,
          errorMessage: "Product Not Deleted",
        });
      }
    }
  }),
  updateBrandLogo: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const productId = await ProductSchema.findOne({ _id: id });

    if (!file) {
      return res.status(404).json({
        status: false,
        errorMessage: "logo not found",
      });
    }
    const deleteBrandLogo = await cloudinary.uploader.destroy(
      productId.brand.logo.public_id
    );

    if (!deleteBrandLogo) {
      return res.status(404).json({
        status: false,
        errorMessage: "not updated",
      });
    } else {
      const product = await cloudinary.uploader.upload(file.path, {
        folder: "seller/brandLogo",
        resource_type: "image",
      });

      if (!product) {
        return res.status(404).json({
          status: false,
          errorMessage: "not updated",
        });
      }

      const brandlogo = await ProductSchema.updateOne(
        {
          _id: productId._id,
        },
        {
          $set: {
            brand: {
              name: productId.brand.name,
              logo: {
                public_id: product.public_id,
                img: product.secure_url,
              },
            },
          },
        },
        {
          new: true,
        }
      );
      if (brandlogo) {
        return res.status(200).json({
          status: true,
          successMessage: "Brand Logo Has Been Update",
        });
      } else {
        return res.status(404).json({
          status: false,
          errorMessage: "Not updated",
        });
      }
    }
  }),
  updateThumbnail: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const productId = await ProductSchema.findOne({ _id: id });

    if (!file) {
      return res.status(404).json({
        status: false,
        errorMessage: "logo not found",
      });
    }
    const deleteImage = await cloudinary.uploader.destroy(
      productId.thumbnail.public_id
    );

    if (!deleteImage) {
      return res.status(404).json({
        status: false,
        errorMessage: "not updated",
      });
    } else {
      const productThumbnail = await cloudinary.uploader.upload(file.path, {
        folder: "seller/thumbnail",
        resource_type: "image",
      });

      if (!productThumbnail) {
        return res.status(404).json({
          status: false,
          errorMessage: "not updated",
        });
      }
      const thumbnail = await ProductSchema.updateOne(
        {
          _id: productId._id,
        },
        {
          $set: {
            thumbnail: {
              public_id: productThumbnail.public_id,
              img: productThumbnail.secure_url,
            },
          },
        },
        {
          new: true,
        }
      );
      if (thumbnail) {
        return res.status(200).json({
          status: true,
          successMessage: "Thumbnail Has Been Update",
        });
      } else {
        return res.status(404).json({
          status: false,
          errorMessage: "not updated",
        });
      }
    }
  }),
  updateImage: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const file = req.files;
    const productId = await ProductSchema.findOne({ _id: id });

    if (!file) {
      return res.status(404).json({
        status: false,
        errorMessage: "logo not found",
      });
    }

    if (!productId) {
      return res.status(404).json({
        status: false,
        errorMessage: "not updated",
      });
    } else {
      productId.images.forEach(
        async (image) => await cloudinary.uploader.destroy(image.public_id)
      );
      const arr = [];
      for (const files of file) {
        const { path } = files;

        const uploadUrl = await cloudinary.uploader.upload(path, {
          folder: "seller/products",
          resource_type: "image",
        });

        if (!uploadUrl) {
          res.status(403).json({
            status: false,
            errorMessage: "images Not Uploaded",
          });
        } else {
          arr.push({
            public_id: uploadUrl.public_id,
            img: uploadUrl.secure_url,
          });
        }
      }
      if (!arr) {
        return res.status(404).json({
          status: false,
          errorMessage: "not updated",
        });
      }
      const image = await ProductSchema.updateOne(
        {
          _id: productId._id,
        },
        {
          $set: {
            images: arr,
          },
        },
        {
          new: true,
        }
      );
      if (image) {
        return res.status(200).json({
          status: true,
          successMessage: "Logo Has Been Update",
        });
      } else {
        return res.status(404).json({
          status: false,
          errorMessage: "not updated",
        });
      }
    }
  }),
};
module.exports = SellerProduct;
