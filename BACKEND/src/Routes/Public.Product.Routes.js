const Product = require("../Controller/Products_API/product.Corntroller");

const APP = require("express");
const ProductRouter = APP.Router();

ProductRouter.route("/product").get(Product.AllProduct);
ProductRouter.route("/category").get(Product.ProductByCategory);
ProductRouter.route("/category/:category").get(Product.getSubcategory);
ProductRouter.route("/category/:category/:subcategory").get(
  Product.getdatabySubcategory
);
ProductRouter.route("/product/:id").get(Product.getProduct);

module.exports = ProductRouter;
