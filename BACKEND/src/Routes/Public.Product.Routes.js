import APP from 'express'
import Product from '../Controller/product.Corntroller.js'
import WhiteListController from '../Controller/whitelist.Controller.js'
import PublicAuthMiddleware from '../Middleware/Public.Auth.MiddleWare.js'
const ProductRouter = APP.Router()

ProductRouter.route('/product').get(Product.AllProduct)
ProductRouter.route('/search').get(Product.searchFeature)
ProductRouter.route('/category').get(Product.Category)
ProductRouter.route('/category/:category').get(Product.getSubcategory)
ProductRouter.route('/category/:category/:subcategory').get(Product.getdatabySubcategory)
ProductRouter.route('/product/:id').get(Product.getProduct)
ProductRouter.route('/whitelist')
    .get(PublicAuthMiddleware.validUser, WhiteListController.getWhitelist)
    .post(PublicAuthMiddleware.validUser, WhiteListController.addWhitelist)
ProductRouter.route('/whitelist/:id').delete(PublicAuthMiddleware.validUser, WhiteListController.removeWhitelist)
export default ProductRouter
