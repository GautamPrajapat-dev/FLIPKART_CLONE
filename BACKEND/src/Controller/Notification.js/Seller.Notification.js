const asyncHandler = require('../../Utils/asyncHandler')

const SellerNotification = {
    postNotification: asyncHandler(async (req, res) => {
        const { userId, productId } = req.body
        const sellerId = res.Seller.sellerId
    })
}
module.exports = SellerNotification
