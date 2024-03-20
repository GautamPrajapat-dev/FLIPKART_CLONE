const PublicAuthController = require("../Controller/Public.Auth.Controller");
const PublicAuthMiddleware = require("../Middleware/Public.Auth.MiddleWare");
const PublicRouter = require("express").Router();
const limit = require("../Utils/limit.Handler");
const { upload } = require("../Middleware/image.upload");

PublicRouter.route("/all-user").get(
  PublicAuthMiddleware.validUser,
  PublicAuthController.allUsers
);

PublicRouter.route("/signup").post(
  PublicAuthMiddleware.PublicAuthSignUpMiddleware,
  PublicAuthController.signUp
);

PublicRouter.route("/signin").post(
  limit.loginlimit,
  PublicAuthMiddleware.PublicAuthLoginMiddleware,
  PublicAuthController.SignIn
);
PublicRouter.route("/change-password").post(
  limit.changePassLImit,
  PublicAuthMiddleware.validUser,
  PublicAuthMiddleware.PublicChangePassword,
  PublicAuthController.changeUserPassword
);
PublicRouter.route("/forget-password").post(
  PublicAuthController.forgetpassword
);

PublicRouter.route("/reset-password").post(
  PublicAuthMiddleware.PublicResetPassword,
  PublicAuthController.passwordReset
);
PublicRouter.route("/update-details").post(
  PublicAuthMiddleware.validUser,
  PublicAuthController.updateUserDetails
);
PublicRouter.route("/uploadAvatar").post(
  PublicAuthMiddleware.validUser,
  upload.single("avatar"),
  PublicAuthController.uploadAvatar
);

module.exports = PublicRouter;
