import asyncHandler from '../../Utils/asyncHandler.js'

const SellerNotification = {
    postNotification: asyncHandler(async (req, res) => {
        const { userId, productId } = req.body
        const sellerId = res.Seller.sellerId
    })
}
export default SellerNotification
