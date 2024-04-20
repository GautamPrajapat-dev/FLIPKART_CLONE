const mongoose = require("mongoose");
const whitelistSchema = require("../../Schema/product.whiteList");
const asyncHandler = require("../../Utils/asyncHandler");

const WhiteListController = {
  addWhitelist: asyncHandler(async (req, res) => {
    const whitelist = new whitelistSchema(req.body);
    if (!whitelist) {
      res.status(400).json({ status: false, erorrMessage: "Invalid Product" });
    } else {
      await whitelist.save();
      res
        .status(201)
        .json({ status: true, successMessage: "Product Add To WhiteList" });
    }
  }),
  removeWhitelist: asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
      res
        .status(400)
        .json({ status: false, erorrMessage: "Invalid whiteList Item " });
    }
    const deleted = await whitelistSchema.deleteOne({ _id: id });
    if (deleted) {
      res
        .status(200)
        .json({ status: true, successMessage: "Removed SeccessFully" });
    }
  }),
  getWhitelist: asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    console.log(req.params.id);
    const uId = new mongoose.Types.ObjectId(req.params.id);
    const products = await whitelistSchema.aggregate([
      {
        $match: {
          userId: uId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
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
