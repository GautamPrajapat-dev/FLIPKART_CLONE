import PublicAuthController from '../Controller/Public.Auth.Controller.js';
import PublicAuthMiddleware from '../Middleware/Public.Auth.MiddleWare.js';
import { Router } from 'express';
import limit from '../Utils/limit.Handler.js';
import { upload } from '../Middleware/image.upload.js';
let PublicRouter = Router();
PublicRouter.route('/getDetails').get(PublicAuthMiddleware.validUser, PublicAuthController.userDetails);

PublicRouter.route('/getUserId').get(PublicAuthMiddleware.validUser, PublicAuthController.userId);

PublicRouter.route('/signup').post(PublicAuthMiddleware.PublicAuthSignUpMiddleware, PublicAuthController.signUp);

PublicRouter.route('/signin').post(limit.loginlimit, PublicAuthMiddleware.PublicAuthLoginMiddleware, PublicAuthController.SignIn);
PublicRouter.route('/change-password').post(
    limit.changePassLImit,
    PublicAuthMiddleware.validUser,
    PublicAuthMiddleware.PublicChangePassword,
    PublicAuthController.changeUserPassword
);
PublicRouter.route('/forget-password').post(PublicAuthController.forgetpassword);

PublicRouter.route('/reset-password').post(PublicAuthMiddleware.PublicResetPassword, PublicAuthController.passwordReset);
PublicRouter.route('/update-details').post(PublicAuthMiddleware.validUser, PublicAuthController.updateUserDetails);
PublicRouter.route('/uploadAvatar').post(PublicAuthMiddleware.validUser, upload.single('avatar'), PublicAuthController.uploadAvatar);
// post cart
PublicRouter.route('/cart')
    .get(PublicAuthMiddleware.validUser, PublicAuthController.getCart)
    .post(PublicAuthMiddleware.validUser, PublicAuthController.cartAdd);
export default PublicRouter;
