const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'PublicUser', required: true },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },

        date: { type: Date, default: Date.now() }
    },
    { timestamps: true }
)

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
        )
    } catch (error) {
        console.log(error)
    }
}
schema.methods.compareToken = async function (token) {
    return await jwt.verify(token, process.env.SECRET_KEY)
}
const whitelistSchema = model('whitelist', schema)
module.exports = whitelistSchema
