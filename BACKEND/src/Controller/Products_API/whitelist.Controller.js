const mongoose = require('mongoose')
const whitelistSchema = require('../../Schema/product.whiteList')
const asyncHandler = require('../../Utils/asyncHandler')
const ProductSchema = require('../../Schema/Seller.Product.Schema')
const PublicAuthSchema = require('../../Schema/Public.Auth.Schema')
const errorHandler = require('../../Middleware/error.MiddkerWare')
const ApiError = require('../../Utils/ApiError.js')

const WhiteListController = {
    addWhitelist: asyncHandler(async (req, res, next) => {
        const userid = new mongoose.Types.ObjectId(res.user.userId)
        const alreadyExists = await PublicAuthSchema.findOne({
            'whiteList.productId': req.body.productId
        })

        // checking if already exists means prodcut are already added
        if (alreadyExists) {
            // throw new ApiError(409, "already exists product");
            return errorHandler(409, 'Already Add Your Product In WhiteList', res)
        }
        const whitelist = await PublicAuthSchema.findByIdAndUpdate(
            userid,
            {
                $addToSet: {
                    whiteList: { productId: req.body.productId }
                }
            },
            { new: true }
        )

        if (!whitelist) {
            return errorHandler(400, 'Invalid User', res)
        } else {
            res.status(201).json({ status: true, successMessage: 'Product Add To WhiteList' })
        }
    }),
    removeWhitelist: asyncHandler(async (req, res, next) => {
        const { id } = req.params
        if (!id && !id === '' && id !== undefined) {
            return errorHandler(400, 'Invalid whiteList Item', res)
        }
        const ids = new mongoose.Types.ObjectId(id)

        const deleted = await PublicAuthSchema.updateOne(
            { _id: res.user.userId },
            {
                $pull: {
                    whiteList: { productId: ids }
                }
            }
        )
        console.log(deleted)
        if (deleted.modifiedCount === 1) {
            res.status(200).json({ status: true, successMessage: 'Removed SeccessFully' })
        } else {
            res.status(400).json({ status: false, errorMessage: 'Invalid Product Id' })
        }
    }),
    getWhitelist: asyncHandler(async (req, res) => {
        const uId = new mongoose.Types.ObjectId(res.user.userId)

        const user = await PublicAuthSchema.findOne({ _id: uId })

        if (!user) {
            res.status(400).json({ status: false, errorMessage: 'user not found' })
        }

        const productAggregate = await PublicAuthSchema.aggregate([
            {
                $match: {
                    _id: uId
                }
            },
            {
                $unwind: '$whiteList'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'whiteList.productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $group: {
                    _id: '$_id',
                    totalProduct: { $sum: 1 },
                    product: { $push: '$product' }
                }
            }
        ])

        if (productAggregate) {
            res.status(200).json({
                status: true,
                product: productAggregate
            })
        } else {
            res.status(400).son({ status: false, errorMessage: 'whiteList empty' })
        }
    })
}
module.exports = WhiteListController
