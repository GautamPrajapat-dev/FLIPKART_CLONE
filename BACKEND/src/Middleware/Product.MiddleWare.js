import Joi from 'joi'
import jwt from 'jsonwebtoken'

// token verificaton

// check validations for authorization
async function validData(data, schema, res, next) {
    try {
        await schema.validateAsync({ ...data })
        next()
    } catch (error) {
        res.send({ status: false, errorMessage: error.details[0].message })
        return false
    }
}
const ProductValidation = {
    async ValidUser(req, res, next) {
        try {
            // const token = req.headers.authorization.split(" ")[1];
            // const token = req.cookies.token;
            // if token undefined then return error
            if (req.headers.authorization === undefined) {
                await res.status(403).json({
                    status: false,
                    message: 'Please Login Now To Uploaded Product'
                })
                return false
            }
            // split bearer token into token
            const token = req.headers.authorization.split(' ')[1]
            // check token undefined
            if (token === undefined) {
                // authorization check header is undefined to send error
                if (req.headers.authorization === undefined) {
                    await res.status(403).json({
                        status: false,
                        message: 'You are not Allow to access'
                    })
                }
                return false
            }
            // verify jwt token to secret key
            const verify = await jwt.verify(token, process.env.SECRET_KEY)
            // send response seller details
            res.Seller = verify

            next()
        } catch (error) {
            await res.status(401).json({ message: error.message })
        }
    },

    async addProductValid(req, res, next) {
        // create object with Joi
        const schema = await Joi.object({
            title: Joi.string().required(),
            brand: Joi.object({
                name: Joi.string().required()
            })
                .unknown(true)
                .required(),
            qty: Joi.number().min(1).max(9999).message('Maxinum value must be 9999').required(),
            description: Joi.string().required(),
            category: Joi.object({
                category: Joi.string(),
                subCategory: Joi.string(),
                targetAudiences: Joi.string(),
                gender: Joi.string(),
                age: Joi.string()
            }).required(),
            features: Joi.boolean(),
            price: Joi.object({
                mrp: Joi.number(),
                cost: Joi.number(),
                discount: Joi.number()
            }).required(),
            thumbnail: Joi.object({
                public_id: Joi.string(),
                img: Joi.string()
            }),
            rating: Joi.object({
                rate: Joi.number(),
                count: Joi.number()
            })
        }).unknown(true)
        validData(req.body, schema, res, next)
    }
}
export default ProductValidation
