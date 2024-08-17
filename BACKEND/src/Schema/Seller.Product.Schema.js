const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const productComment = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "pulbicuser" },
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

const Notification = new Schema({
  title: { type: String },
  read: { type: Boolean, default: false },
  readAll: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "pulbicuser" },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});
const schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "sellerusers",
    },
    brand: {
      name: { type: String },
      logo: { public_id: { type: String }, img: { type: String } },
    },
    qty: { type: Number, default: 1 },
    description: {
      type: String,
    },
    category: {
      category: { type: String, trim: true, lowercase: true },
      subCategory: { type: String, trim: true, lowercase: true },
      // for: { type: String, trim: true, lowercase: true },
      age: { type: String, trim: true, lowercase: true },
      gender: {
        type: String,
        enum: ["Men", "Women", "Kids"], // assuming three options
      },
      targetAudiences: {
        type: String,
      },
    },
    features: { type: Boolean, default: false },
    price: {
      mrp: { type: Number },
      cost: { type: Number },
      discount: { type: Number },
    },
    thumbnail: {
      public_id: { type: String },
      img: { type: String },
    },
    images: [{ public_id: { type: String }, img: { type: String } }],
    rating: {
      rate: { type: Number },
      count: {
        type: Number,
      },
    },
    comment: {
      type: productComment,
    },
    views: {
      type: Number,
      default: 0,
    },
    notifications: {
      type: Notification,
    },
  },

  { timestamps: true }
);
schema.methods.genToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      // @ts-ignore
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

schema.methods.compareToken = async function (token) {
  return await jwt.verify(token, process.env.SECRET_KEY);
};
const ProductSchema = model("products", schema);
module.exports = ProductSchema;
