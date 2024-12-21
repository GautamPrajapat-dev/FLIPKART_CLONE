import { Schema, model } from 'mongoose'

// import bcrypt from 'bcryptjs'
const schema = new Schema(
    {
        filter_name: {
            type: String
        },
        filter: {
            type: Array
        }
    },
    { timestamps: true }
)
const filter_Shema = model('filters', schema)
export default filter_Shema
