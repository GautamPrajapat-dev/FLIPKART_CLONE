const { default: mongoose } = require('mongoose')
const calculatePagination = require('./calculatePagination')

const ApiFeatures = async (query, ProductSchema, res) => {
    const {
        search = '',
        category = '',
        subcategory = '',
        minPrice = 0,
        maxPrice = Infinity,
        sortBy = 'createdAt',
        sortOrder = 'asc',
        page = 1,
        limit,
        pid
    } = query
    const user = new mongoose.Types.ObjectId('66bf6214e6f10615decbc8dc')
    const productId = new mongoose.Types.ObjectId(pid)
    const pages = parseInt(page) || 1
    const limits = parseInt(limit) || 3
    const pipeline = []
    if (pid) {
        pipeline.push({
            $match: {
                _id: productId
            }
        })
    } else {
        pipeline.push({
            $match: {
                $and: [
                    category ? { 'category.category': { $regex: category, $options: 'i' } } : {},
                    subcategory ? { 'category.subCategory': { $regex: subcategory, $options: 'i' } } : {},
                    minPrice ? { 'price.mrp': { $gte: minPrice, $lte: maxPrice } } : {}
                ]
            }
        })
        // Search stage if search term is provided
        if (search) {
            pipeline.push({
                $match: {
                    $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]
                }
            })
        } else {
            pipeline.push({
                $sample: { size: 5 } // Randomly select 5 products
            })
        }
    }
    // Count total number of documents
    const totalCount = await ProductSchema.aggregate(pipeline).count('totalCount').exec()
    const totalProducts = totalCount[0] ? totalCount[0].totalCount : 0
    const totalPages = Math.ceil(totalProducts / limits)
    pipeline.push({ $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } })
    pipeline.push({ $skip: (pages - 1) * limits })
    pipeline.push({ $limit: limits })
    pipeline.push(
        {
            $lookup: {
                from: 'publicusers',
                let: {
                    productId: '$_id'
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ['$_id', user]
                                    },
                                    {
                                        $in: ['$$productId', '$whiteList.productId']
                                    }
                                ]
                            }
                        }
                    }
                ],
                as: 'productDetails'
            }
        },

        {
            $addFields: {
                inWhiteList: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $size: '$productDetails'
                                },
                                0
                            ]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $unset: 'productDetails'
        }
    )
    console.log(pipeline)
    const results = await ProductSchema.aggregate(pipeline).exec()
    const { prevPages, nextPages, hasOwnPage } = calculatePagination(pages, totalPages, results)
    const data = { curruntPage: page, productPerpage: results.length, totalProducts, prevPages, nextPages, hasOwnPage, results }
    return data
}

module.exports = ApiFeatures
