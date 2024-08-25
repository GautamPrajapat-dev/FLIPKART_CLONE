import mongoose from 'mongoose'
import ProductSchema from '../../Schema/Seller.Product.Schema.js'
// import ApiFeature from'../../Utils/ApiFeatures'
import asyncHandler from '../../Utils/asyncHandler.js'
import calculatePagination from '../../Utils/calculatePagination.js'
import ApiFeatures from '../../Utils/ApiFeature.js'

const Product = {
    AllProduct: asyncHandler(async (req, res) => {
        const data = await ApiFeatures(req.query, ProductSchema, res)
        res.json({ status: true, path: req.url, ...data })
        return false
    }),
    // AllProduct: asyncHandler(async (req, res) => {
    //     const page = parseInt(req.query.page) || 1
    //     const limit = parseInt(req.query.limit) || 3

    //     const products = new ApiFeature(ProductSchema, req.query).filter().search().sort().limitFields().paginate()
    //     const product = await products.query
    //     const totalProductsCount = await ProductSchema.find({}).countDocuments()
    //     const totalPage = Math.ceil(totalProductsCount / limit)
    //     const { prevPages, nextPages, hasOwnPage } = calculatePagination(page, totalPage, product)
    //     res.status(200).json({
    //         path: req.url,
    //         totalProducts: totalProductsCount,
    //         productperPage: product.length,
    //         pagePerLimit: limit,
    //         totalPages: totalPage,
    //         prevPages: prevPages,
    //         nextPages: nextPages,
    //         prevPage: page === 1 ? 1 : page - 1,
    //         nextPage: page + 1,
    //         page: page,
    //         hasOwnPage,
    //         status: true,
    //         products: product
    //     })
    // }),
    getProduct: asyncHandler(async (req, res) => {
        const product = await ProductSchema.findById({
            _id: req.params.id
        })

        if (!product) {
            return res.status(404).json({
                status: false,
                errorMessage: 'not found'
            })
        }
        const products = await ProductSchema.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { views: 1 }
            },
            { new: true }
        )
        // product.views += 1;
        await products.save()
        res.status(200).json({
            status: true,
            length: product.length,
            data: product
        })
    }),
    Category: asyncHandler(async (req, res) => {
        const product = await ProductSchema.aggregate([
            {
                $group: {
                    _id: '$category.category',
                    subcategories: { $addToSet: '$category.subCategory' }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    subcategories: 1
                }
            },
            {
                $sort: { category: 1 } // Sort categories in ascending order
            },
            {
                $unwind: '$subcategories'
            },
            {
                $sort: { subcategories: 1 } // Sort subcategories in ascending order
            },
            {
                $group: {
                    _id: '$category',
                    subcategories: { $push: '$subcategories' }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    subcategories: 1
                }
            },
            {
                $sort: { category: 1 } // Ensure categories are sorted again if necessary
            }
        ])
        if (!product) {
            return res.status(404).json({
                status: false,
                errorMessage: 'not found'
            })
        }

        res.status(200).json({
            status: true,
            path: req.path,
            product
        })
    }),
    getSubcategory: asyncHandler(async (req, res) => {
        const params = req.params.category
        const product = await ProductSchema.aggregate([
            {
                $unwind: '$category'
            },
            {
                $match: {
                    'category.category': params // Replace with the desired category
                }
            },
            {
                $group: {
                    _id: {
                        category: '$category.category',
                        subCategory: '$category.subCategory'
                    },
                    productCount: {
                        $sum: 1
                    },
                    products: {
                        $push: {
                            _id: '$_id',
                            title: '$title',
                            brand: '$brand',
                            thumbnail: '$thumbnail',
                            price: '$price',
                            rating: '$rating'
                        }
                    }
                }
            },
            {
                $addFields: {
                    category: '$_id.category',
                    subCategory: '$_id.subCategory'
                }
            },
            {
                $project: {
                    _id: 0,
                    category: 1,
                    subCategory: 1,
                    productCount: 1,
                    products: 1,
                    inWhiteList: 1
                }
            },
            {
                $sort: {
                    productCount: -1
                }
            }
            // {
            //   $limit: 6
            // } // Uncomment this line if you want to limit the results
        ])

        if (!product) {
            return res.status(404).json({
                status: false,
                errorMessage: 'not found'
            })
        }
        res.status(200).json({
            status: true,
            length: product.length,
            product
        })
    }),
    getdatabySubcategory: asyncHandler(async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3

        const user = new mongoose.Types.ObjectId('66bf6214e6f10615decbc8dc')
        const pipeline = [
            {
                $sort: {
                    views: -1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
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
        ]

        if (req.query.pid && req.query.pid !== '') {
            const id = new mongoose.Types.ObjectId(req.query.pid)
            pipeline.unshift({
                $match: {
                    _id: id
                }
            })
        }
        if (req.params.category && req.params.subcategory) {
            pipeline.unshift({
                $match: {
                    'category.category': req.params.category,
                    'category.subCategory': req.params.subcategory
                }
            })
        }
        if (req.query.search && req.query.search !== '') {
            pipeline.unshift({
                $match: {
                    $or: [{ title: { $regex: req.query.search, $options: 'i' } }, { description: { $regex: req.query.search, $options: 'i' } }]
                }
            })
        }
        // console.log(pipeline)
        const p = await ProductSchema.aggregate(pipeline)

        const totalProductsCount = await ProductSchema.find({
            'category.subCategory': {
                $regex: req.params.subcategory
            },
            'category.category': {
                $regex: req.params.category
            }
        }).countDocuments()

        const totalPage = Math.ceil(totalProductsCount / limit)
        const { prevPages, nextPages, hasOwnPage } = calculatePagination(page, totalPage, p)

        res.status(200).json({
            status: true,
            path: req.url,
            totalProducts: totalProductsCount,
            productperPage: p.length,
            pagePerLimit: limit,
            totalPages: totalPage,
            prevPages: prevPages,
            nextPages: nextPages,
            prevPage: page === 1 ? 1 : page - 1,
            nextPage: page + 1,
            page: page,
            hasOwnPage,
            data: p
        })
    }),
    searchFeature: asyncHandler(async (req, res) => {
        const searchQuery = req.query.search
        let pipeline = []
        const extractSearchTermAndPriceLimit = (query) => {
            // Extract price limit
            const priceMatch = query.match(/(?:under|max)\s+(\d+)/i)
            const priceLimit = priceMatch ? parseInt(priceMatch[1], 10) : null

            const searchTerm = query.replace(/(?:under|max)\s+\d+/i, '').trim()

            return { searchTerm, priceLimit }
        }
        const { searchTerm, priceLimit } = extractSearchTermAndPriceLimit(searchQuery)

        if (searchTerm && searchTerm.trim().length > 0) {
            pipeline = [
                {
                    $match: priceLimit ? { 'price.mrp': { $lte: priceLimit } } : {}
                },
                {
                    $match: {
                        $or: [
                            { title: { $regex: searchTerm, $options: 'i' } },
                            { description: { $regex: searchTerm, $options: 'i' } },
                            {
                                'category.category': { $regex: searchTerm, $options: 'i' }
                            },
                            {
                                'category.subCategory': { $regex: searchTerm, $options: 'i' }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        category: 1,

                        description: { $substr: ['$description', 0, 100] }
                    }
                },
                {
                    $sort: {
                        views: -1 // Sorting by views or relevance
                    }
                },
                {
                    $limit: 5 // Limit suggestions to 5
                }
            ]
        } else {
            pipeline = [
                {
                    $sample: { size: 5 } // Randomly select 5 products
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        category: 1,
                        description: { $substr: ['$description', 0, 100] }
                    }
                }
            ]
        }

        const product = await ProductSchema.aggregate(pipeline)
        res.status(200).json(product)
    })
}

export default Product
