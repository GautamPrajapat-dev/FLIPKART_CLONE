const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')

const schema = new Schema(
    {
        title: { type: String },
        read: { type: Boolean, default: false },
        readAll: { type: Boolean, default: false },
        sellerId: { type: Schema.Types.ObjectId, ref: 'sellerUser' },
        userId: { type: Schema.Types.ObjectId, ref: 'pulbicuser' },
        productId: { type: Schema.Types.ObjectId, ref: 'products' },
        notificationLength: { type: Number, default: 0 },
        noficationDate: { type: Date, default: Date.now() }
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
const NotificationSchema = model('notification', schema)
module.exports = NotificationSchema
