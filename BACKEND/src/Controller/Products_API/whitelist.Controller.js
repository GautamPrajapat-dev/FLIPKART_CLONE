const mongoose = require("mongoose");
const whitelistSchema = require("../../Schema/product.whiteList");
const asyncHandler = require("../../Utils/asyncHandler");
const ProductSchema = require("../../Schema/Seller.Product.Schema");

const WhiteListController = {
  addWhitelist: asyncHandler(async (req, res) => {
    const userid = new mongoose.Types.ObjectId(res.user.userId);
    const alreadyExists = await whitelistSchema.findOne({
      productId: req.body.productId,
    });

    // checking if already exists means prodcut are already added
    if (alreadyExists) {
      return res.status(409).json({
        status: false,
        erorrMessage: "Already Add Your Product In WhiteList",
      });
    }
    const whitelist = new whitelistSchema({
      productId: req.body.productId,
      userId: userid,
    });
    if (!whitelist) {
      res.status(400).json({ status: false, erorrMessage: "Invalid Product" });
    } else {
      await ProductSchema.updateOne(
        { _id: req.body.productId },
        {
          $set: {
            whitelisted: true,
          },
        }
      );
      await whitelist.save();
      res
        .status(201)
        .json({ status: true, successMessage: "Product Add To WhiteList" });
    }
  }),
  removeWhitelist: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id && !id === "" && id !== undefined) {
      res
        .status(400)
        .json({ status: false, erorrMessage: "Invalid whiteList Item" });
    }
    const ids = new mongoose.Types.ObjectId(id);

    const deleted = await whitelistSchema.deleteOne({ productId: ids });

    if (deleted.deletedCount === 1) {
      await ProductSchema.updateOne(
        { _id: ids },
        {
          $set: {
            whitelisted: false,
          },
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ status: true, successMessage: "Removed SeccessFully" });
    } else {
      res
        .status(400)
        .json({ status: true, errorMessage: "Invalid Product Id" });
    }
  }),
  getWhitelist: asyncHandler(async (req, res) => {
    // const { userId } = req.body;
    // console.log(userId);
    // console.log(req.params.id);
    const uId = new mongoose.Types.ObjectId(res.user.userId);

    const products = await whitelistSchema.aggregate([
      {
        $match: {
          userId: uId, // Replace `uId` with the actual user ID value
        },
      },
      {
        $lookup: {
          from: "products", // The collection to join with
          localField: "productId", // The field in the current collection
          foreignField: "_id", // The field in the products collection
          as: "productDetails", // The name of the array to store the joined documents
        },
      },

      {
        $unwind: "$productDetails", // Unwind productDetails to handle each product separately
      },
      {
        $group: {
          _id: "$userId", // Group by userId
          product: { $push: "$productDetails" }, // Push each productDetails into a single array
          totalProduct: { $sum: 1 }, // Count the total number of products
        },
      },
      {
        $project: {
          product: 1,
          totalProduct: 1,
          _id: 0, // Optionally exclude the _id field from the output
        },
      },
    ]);

    if (products) {
      res.status(200).json({ status: true, products });
    } else {
      res.status(400).json({ status: false, errorMessage: "whiteList empty" });
    }
  }),
};
module.exports = WhiteListController;
