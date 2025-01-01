import mongoose from 'mongoose';
import filter_Shema from '../Schema/FilterSchema.js';
import asyncHandler from '../Utils/asyncHandler.js';

export const filterController = {
    filter: asyncHandler(async (req, res) => {
        const filter = await filter_Shema.find();
        res.status(200).json(filter);
    }),
    filterID: asyncHandler(async (req, res) => {
        const query = req.query;
        const id = new mongoose.Types.ObjectId(query.id);

        const filter = await filter_Shema.aggregate([
            { $match: { $or: [query.id ? { _id: id } : {}, query.f_name ? { filter_name: query.f_name } : {}] } }
        ]);
        res.status(200).json(filter);
    })
};
