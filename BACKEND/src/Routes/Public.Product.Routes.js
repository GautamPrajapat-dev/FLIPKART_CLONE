const Product = require("../Controller/Products_API/product.Corntroller");

const APP = require("express");
const WhiteListController = require("../Controller/Products_API/whitelist.Controller");
const PublicAuthMiddleware = require("../Middleware/Public.Auth.MiddleWare");
const ProductRouter = APP.Router();

ProductRouter.route("/product").get(Product.AllProduct);
ProductRouter.route("/category").get(Product.Category);
ProductRouter.route("/category/:category").get(Product.getSubcategory);
ProductRouter.route("/category/:category/:subcategory").get(
  Product.getdatabySubcategory
);
ProductRouter.route("/product/:id").get(Product.getProduct);
ProductRouter.route("/whitelist")
  .get(PublicAuthMiddleware.validUser, WhiteListController.getWhitelist)
  .post(PublicAuthMiddleware.validUser, WhiteListController.addWhitelist);
ProductRouter.route("/whitelist/:id").delete(
  WhiteListController.removeWhitelist
);
module.exports = ProductRouter;
