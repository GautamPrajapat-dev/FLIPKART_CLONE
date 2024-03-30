const ProductSchema = require("../Schema/Seller.Product.Schema");
const SellerAuhSchema = require("../Schema/Seller.Auth.Schema");
const ApiFeature = require("../Utils/ApiFeatures");
const asyncHandler = require("../Utils/asyncHandler");
const cloudinary = require("cloudinary").v2;
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
  getAllproducts: asyncHandler(async (req, res) => {
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
    const total = Math.ceil(count / 3);

    if (products) {
      if (products.length === 0) {
        return res.status(400).json({
          status: false,
          errorMessage: "Not found",
        });
      }
      res.status(200).json({
        status: true,
        totalProduct: count,
        totalPage: total,
        path: req.path,
        length: products.length,
        next: Number(req.query.page) + 1,
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
    const product = await ProductSchema.findById({ _id: req.params.id });
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

    console.log(req.body);
    // upload product on cloudinary using uploader method and save in public/avatar folder
    const sellerFind = await SellerAuhSchema.findById({
      _id: res.Seller.sellerId,
    });
    console.log(sellerFind);
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
    console.log(req.body);

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

    const product = await ProductSchema.updateOne(
      {
        _id: req.params.id,
      },
      {
        sellerId: res.Seller.sellerId,
        title: title,
        qty: qty,
        description: description,
        category: category,
        features: Boolean(features),
        price: price,
        rating: rating,
        brand: req.body.brand,
      }
    );
    if (product) {
      res.status(200).json({
        status: true,
        successMessage: "product Update successfully",
        product: product,
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
              name: req.body.brand.name,
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
          status: false,
          errorMessage: "Logo Has Been Update",
        });
      } else {
        return res.status(404).json({
          status: false,
          errorMessage: "not updated",
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

    if (!deleteThumbnail) {
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
          status: false,
          errorMessage: "Thumbnail Has Been Update",
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
    console.log(productId);

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
        console.log("files hai kya" + files);
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
      console.log(arr);
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
          status: false,
          errorMessage: "Logo Has Been Update",
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
