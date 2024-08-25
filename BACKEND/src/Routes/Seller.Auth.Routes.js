import SellerAuthController from '../Controller/Seller.Auth.Controller.js'
import SellerauthMiddleware from '../Middleware/Seller.Auth.MiddleWare.js'
import { Router } from 'express'
import limit from '../Utils/limit.Handler.js'
import { upload } from '../Middleware/image.upload.js'
let SellerRoutes = Router()
SellerRoutes.route('/sellerDetails').get(SellerauthMiddleware.SellerValidUser, SellerAuthController.getSellerDetails)
SellerRoutes.route('/seller-profile').get(SellerauthMiddleware.SellerValidUser, SellerAuthController.getAllDetails)
SellerRoutes.route('/register').post(SellerauthMiddleware.SellerRegiseter, SellerAuthController.registerSeller)
SellerRoutes.route('/login').post(limit.loginlimit, SellerauthMiddleware.SellerLogin, SellerAuthController.loginSeller)
SellerRoutes.route('/change-password').put(
    limit.changePassLImit,
    SellerauthMiddleware.SellerValidUser,
    SellerauthMiddleware.SellerChangePassword,
    SellerAuthController.changeSellerPassword
)
SellerRoutes.route('/update-details').put(
    SellerauthMiddleware.Seller_Update_Details,
    SellerauthMiddleware.SellerValidUser,
    SellerAuthController.updateUserDetails
)
SellerRoutes.route('/forget-password').post(SellerAuthController.forgetpassword)
SellerRoutes.route('/reset-password').post(SellerauthMiddleware.SellerResetPassword, SellerAuthController.passwordReset)
SellerRoutes.route('/upload-avatar').put(SellerauthMiddleware.SellerValidUser, upload.single('avatar'), SellerAuthController.uploadAvatar)

export default SellerRoutes
