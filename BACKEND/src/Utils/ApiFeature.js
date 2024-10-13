import mongoose from 'mongoose'
import calculatePagination from './calculatePagination.js'

const ApiFeatures = async (query, ProductSchema) => {
    const {
        search = '',
        category = '',
        subc = '',
        minPrice = 0,
        maxPrice = Infinity,
        sortBy = 'views',
        sortOrder = 'asc',
        page = 1,
        limit,
        pid,
        uid
    } = query

    const productId = new mongoose.Types.ObjectId(pid)
    const pages = parseInt(page) || 1
    const limits = parseInt(limit) || 3
    const pipeline = []
    if (pid && pid !== '') {
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
                    subc ? { 'category.subCategory': { $regex: subc, $options: 'i' } } : {},
                    minPrice ? { 'price.mrp': { $gte: minPrice, $lte: maxPrice } } : {}
                ]
            }
            // Search stage if search term is provided
        })
        if (search) {
            // const extractSearchTermAndPriceLimit = (query) => {
            //     // Extract price limit
            //     const priceMatch = query.match(/(?:under|max)\s+(\d+)/i)

            //     const priceLimit = priceMatch ? priceMatch[1] : null
            //     const searchT = query.replace(/(?:under|max)\s+\d+/i, '').trim()
            //     return { searchT, priceLimit }
            // }
            // const { searchT, priceLimit } = extractSearchTermAndPriceLimit(search)
            // console.log(searchT, priceLimit)
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        {
                            description: { $regex: search, $options: 'i' }
                        },
                        { 'category.category': { $regex: search, $options: 'i' } },
                        { 'category.subCategory': { $regex: search, $options: 'i' } }
                    ]
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
    if (uid) {
        const user = new mongoose.Types.ObjectId(uid)

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
    }

    const results = await ProductSchema.aggregate(pipeline).exec()
    const { prevPages, nextPages, hasOwnPage } = calculatePagination(pages, totalPages, results)

    const data = {
        page: Number(page),
        productperPage: results.length,
        totalProducts,
        totalPages,
        pagePerLimit: limits,
        prevPages,
        nextPages,
        hasOwnPage,
        prevPage: pages === 1 ? 1 : pages - 1,
        nextPage: pages + 1,
        data: results
    }
    return data
}
export default ApiFeatures
