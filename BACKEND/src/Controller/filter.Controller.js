import filter_Shema from '../Schema/FilterSchema.js'
import asyncHandler from '../Utils/asyncHandler.js'

export const filterController = {
    filter: asyncHandler(async (req, res, next) => {
        const filter = await filter_Shema.find({})
        res.status(200).json(filter)
    })
}
