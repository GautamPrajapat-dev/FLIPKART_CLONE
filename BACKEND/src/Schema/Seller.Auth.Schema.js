const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const addressSchema = new Schema({
    address: { type: String },
    country: { type: String },
    city: { type: String },
    pincode: {
        type: String
    },
    state: {
        type: String
    }
})
const paymentDetails = new Schema({
    accountName: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branch: { type: String }
})
const bussinessDetails = new Schema({
    bussinessName: { type: String },
    company: { type: String },
    companyAddress: {
        type: addressSchema
    },
    panNum: {
        type: String
    }
})

const schema = new Schema(
    {
        fname: {
            type: String
        },
        lname: { type: String },
        fullname: { type: String },
        mobile: {
            type: String,
            trim: true
        },
        avatar: {
            public_id: { type: String },
            path: { type: String }
        },

        fullAddress: {
            type: addressSchema
        },
        email: {
            type: String
        },
        gstNum: {
            type: String
        },
        password: {
            type: String
        },
        bussinessDetail: { type: bussinessDetails },
        paymentDetails: {
            type: paymentDetails
        },
        verify: { type: Boolean },
        resetoken: { type: String, default: '' }
    },
    { timestamps: true }
)
schema.pre('save', async function (next) {
    const usr = this
    if (!usr.isModified('password')) {
        next()
    }
    try {
        const genSalt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(usr.password, genSalt)
        this.password = hash_password
    } catch (error) {
        next(error)
    }
})

schema.methods.generatePassword = async function (password) {
    const genSalt = await bcrypt.genSalt(16)
    const hash_password = await bcrypt.hash(password, genSalt)
    return hash_password
}
schema.methods.comparePassword = async function (compare) {
    return await bcrypt.compare(compare, this.password)
}

schema.methods.genToken = async function () {
    try {
        return jwt.sign(
            {
                sellerId: this._id.toString(),
                email: this.email,
                sellerName: this.fullname
            },
            // @ts-ignore
            process.env.SECRET_KEY,
            {
                expiresIn: '3d'
            }
        )
    } catch (error) {
        console.log(error)
    }
}
schema.methods.compareToken = async function (token) {
    return await jwt.verify(token, process.env.SECRET_KEY)
}
const SellerAuhSchema = model('sellerUser', schema)
module.exports = SellerAuhSchema
