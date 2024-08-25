import SellerProduct from '../Controller/Seller.Product.Controller.js'
import ProductValidation from '../Middleware/Product.MiddleWare.js'
import { upload } from '../Middleware/image.upload.js'

import { Router } from 'express'
let SellerProductRoutes = Router()
SellerProductRoutes.route('/add-product').post(
    ProductValidation.ValidUser,
    upload.fields([
        { name: 'brandLogo', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 4 }
    ]),

    ProductValidation.addProductValid,
    SellerProduct.addNewProduct
)
SellerProductRoutes.route('/products').get(ProductValidation.ValidUser, SellerProduct.getAllproducts)
SellerProductRoutes.route('/getDashbordDetails').get(ProductValidation.ValidUser, SellerProduct.getDashBoardDetails)
SellerProductRoutes.route('/products/:id')
    .get(ProductValidation.ValidUser, SellerProduct.getProduct)
    .put(ProductValidation.ValidUser, SellerProduct.updateProduct)
    .delete(ProductValidation.ValidUser, SellerProduct.deleteProduct)

SellerProductRoutes.route('/brandlogo/:id').put(upload.single('brandLogo'), ProductValidation.ValidUser, SellerProduct.updateBrandLogo)
SellerProductRoutes.route('/thumbnail/:id').put(upload.single('thumbnail'), ProductValidation.ValidUser, SellerProduct.updateThumbnail)
SellerProductRoutes.route('/updateImage/:id').put(upload.array('images'), ProductValidation.ValidUser, SellerProduct.updateImage)
export default SellerProductRoutes
