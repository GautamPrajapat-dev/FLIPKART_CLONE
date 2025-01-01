import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import logger from '../Utils/logger.js';

const schema = new Schema(
    {
        recipientId: { type: Schema.Types.ObjectId, required: true },
        recipientType: { type: String, enum: ['User', 'Seller'], required: true },
        title: { type: String },
        isRead: { type: Boolean, default: false },
        readAll: { type: Boolean, default: false },
        link: { type: String },
        // productId: { type: Schema.Types.ObjectId, ref: 'products' },
        notificationLength: { type: Number, default: 0 },
        noficationDate: { type: Date, default: Date.now() }
    },
    { timestamps: true }
);

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
        logger.log(error);
    }
};

schema.methods.compareToken = async function (token) {
    return await jwt.verify(token, process.env.SECRET_KEY);
};
const NotificationSchema = model('notification', schema);
export default NotificationSchema;
