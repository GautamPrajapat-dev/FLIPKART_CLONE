/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const addressSchema = new Schema({
    address: { type: String },
    city: { type: String },
    zipCode: {
        type: String
    },
    state: {
        type: String
    }
});

const schema = new Schema(
    {
        fname: {
            type: String
        },
        lname: { type: String },
        fullname: { type: String },
        mobile: {
            type: String
        },
        fullAddress: {
            type: addressSchema
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        avatar: {
            public_id: { type: String },
            path: { type: String }
        },
        cart: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'products' },
                quantity: { type: Number, default: 1 }
            }
        ],
        orders: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'products' }
            }
        ],
        whiteList: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },

                date: { type: Date, default: Date.now() }
            }
        ],
        notifications: [{ type: Schema.Types.ObjectId, ref: 'notification' }],
        resetoken: { type: String, default: '' }
    },
    { timestamps: true }
);
schema.pre('save', async function (next) {
    const usr = this;
    if (!usr.isModified('password')) {
        next();
    }
    try {
        const genSalt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(usr.password, genSalt);
        this.password = hash_password;
    } catch (error) {
        next(error);
    }
});
// schema.pre("updateOne", async function (next) {
//   const usr = this;
//   if (!usr.isModified("password")) {
//     next();
//   }
//   try {
//     const genSalt = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(usr.password, genSalt);
//     this.password = hash_password;
//   } catch (error) {
//     next(error);
//   }
// });
schema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

schema.methods.genToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email
            },
            // @ts-ignore
            process.env.SECRET_KEY,
            {
                expiresIn: '30d'
            }
        );
    } catch (error) {
        throw new Error(error);
    }
};
schema.methods.compareToken = async function (token) {
    return await jwt.verify(token, process.env.SECRET_KEY);
};
const PublicAuthSchema = model('PublicUser', schema);
export default PublicAuthSchema;
