const mongoose = require("mongoose");
const whitelistSchema = require("../../Schema/product.whiteList");
const asyncHandler = require("../../Utils/asyncHandler");
const ProductSchema = require("../../Schema/Seller.Product.Schema");
const PublicAuthSchema = require("../../Schema/Public.Auth.Schema");

const WhiteListController = {
  addWhitelist: asyncHandler(async (req, res) => {
    const userid = new mongoose.Types.ObjectId(res.user.userId);
    const alreadyExists = await PublicAuthSchema.findOne({
      "whiteList.productId": req.body.productId,
    });

    // checking if already exists means prodcut are already added
    if (alreadyExists) {
      return res.status(409).json({
        status: false,
        erorrMessage: "Already Add Your Product In WhiteList",
      });
    }
    const whitelist = await PublicAuthSchema.findByIdAndUpdate(
      userid,
      {
        $addToSet: {
          whiteList: { productId: req.body.productId },
        },
      },
      { new: true }
    );
    console.log(whitelist);

    if (!whitelist) {
      res.status(400).json({ status: false, erorrMessage: "Invalid User" });
    } else {
      res
        .status(201)
        .json({ status: true, successMessage: "Product Add To WhiteList" });
    }
  }),
  removeWhitelist: asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id && !id === "" && id !== undefined) {
      res
        .status(400)
        .json({ status: false, erorrMessage: "Invalid whiteList Item" });
    }
    const ids = new mongoose.Types.ObjectId(id);

    const deleted = await PublicAuthSchema.updateOne(
      { _id: res.user.userId },
      {
        $pull: {
          whiteList: { productId: ids },
        },
      }
    );
    console.log(deleted);
    if (deleted.modifiedCount === 1) {
      res
        .status(200)
        .json({ status: true, successMessage: "Removed SeccessFully" });
    } else {
      res
        .status(400)
        .json({ status: false, errorMessage: "Invalid Product Id" });
    }
  }),
  getWhitelist: asyncHandler(async (req, res) => {
    const uId = new mongoose.Types.ObjectId(res.user.userId);

    const user = await PublicAuthSchema.findOne({ _id: uId });

    if (!user) {
      res.status(400).json({ status: false, errorMessage: "user not found" });
    }

    const productAggregate = await PublicAuthSchema.aggregate([
      {
        $match: {
          _id: uId,
        },
      },
      {
        $unwind: "$whiteList",
      },
      {
        $lookup: {
          from: "products",
          localField: "whiteList.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$_id",
          totalProduct: { $sum: 1 },
          product: { $push: "$product" },
        },
      },
    ]);
    console.log(productAggregate);

    if (productAggregate) {
      res.status(200).json({
        status: true,
        product: productAggregate,
      });
    } else {
      res.status(400).son({ status: false, errorMessage: "whiteList empty" });
    }
  }),
};
module.exports = WhiteListController;
