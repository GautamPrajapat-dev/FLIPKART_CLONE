require("dotenv").config();
require("./src/servers");
const db = require("./src/Utils/db");
const express = require("express");
const cors = require("cors");
const PublicRouter = require("./src/Routes/Public.Auth.Routes");
const SellerRoutes = require("./src/Routes/Seller.Auth.Routes");
const helmet = require("helmet");
const SellerProductRoutes = require("./src/Routes/Seller.Product.Routes");
const ProductRouter = require("./src/Routes/Public.Product.Routes");
const config = require("./src/Utils/config");

const app = express();
app.use(helmet());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0"
  );
  next();
});
// user cors policy
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
// product routes
app.use("/products/v1", ProductRouter);
// public routes
app.use("/public", PublicRouter);
// seller Routes
app.use("/seller", SellerRoutes);
// seller Routes
app.use("/seller/products/v1", SellerProductRoutes);

// listion server on port 3031

db().then(() => {
  app.listen(config.get("_PORT"), () =>
    console.log(` app listening on port http://localhost:${process.env.PORT}`)
  );
});
