const SellerAuthController = require("../Controller/Seller.Auth.Controller");
const SellerauthMiddleware = require("../Middleware/Seller.Auth.MiddleWare");
const SellerRoutes = require("express").Router();
const limit = require("../Utils/limit.Handler");
const { upload } = require("../Middleware/image.upload");
SellerRoutes.route("/sellerDetails").get(
  SellerauthMiddleware.SellerValidUser,
  SellerAuthController.getSellerDetails
);
SellerRoutes.route("/seller-profile").get(
  SellerauthMiddleware.SellerValidUser,
  SellerAuthController.getAllDetails
);
SellerRoutes.route("/register").post(
  SellerauthMiddleware.SellerRegiseter,
  SellerAuthController.registerSeller
);
SellerRoutes.route("/login").post(
  limit.loginlimit,
  SellerauthMiddleware.SellerLogin,
  SellerAuthController.loginSeller
);
SellerRoutes.route("/change-password").put(
  limit.changePassLImit,
  SellerauthMiddleware.SellerValidUser,
  SellerauthMiddleware.SellerChangePassword,
  SellerAuthController.changeSellerPassword
);
SellerRoutes.route("/update-details").put(
  SellerauthMiddleware.SellerValidUser,
  SellerAuthController.updateUserDetails
);
SellerRoutes.route("/forget-password").post(
  SellerAuthController.forgetpassword
);
SellerRoutes.route("/reset-password").post(
  SellerauthMiddleware.SellerResetPassword,
  SellerAuthController.passwordReset
);
SellerRoutes.route("/upload-avatar").put(
  SellerauthMiddleware.SellerValidUser,
  upload.single("avatar"),
  SellerAuthController.uploadAvatar
);

module.exports = SellerRoutes;
