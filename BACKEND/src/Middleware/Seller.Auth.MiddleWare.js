import Joi from 'joi'
import jwt from 'jsonwebtoken'

// token verificaton

// check validations for authorization
async function validData(data, schema, res, next) {
    try {
        await schema.validateAsync({ ...data })
        next()
    } catch (error) {
        res.status(211).json({ status: false, errorMessage: error.details[0].message })
        return false
    }
}
// seller details verification
const SellerauthMiddleware = {
    async SellerValidUser(req, res, next) {
        // const token = req.headers.authorization.split(" ")[1];
        // const token = req.cookies.token;
        // if token undefined then return error
        if (req.headers.authorization === undefined) {
            await res.status(403).json({
                status: false,
                message: 'You are not Allow to access this page'
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
        try {
            // verify jwt token to secret key
            const verify = await jwt.verify(token, process.env.SECRET_KEY)
            // send response seller details
            res.Seller = verify

            next()
        } catch (error) {
            await res.status(401).json({ message: error.message })
        }
    },
    // register validator
    async SellerRegiseter(req, res, next) {
        // create object with Joi
        const schema = await Joi.object({
            firstname: Joi.string().required().messages({
                'string.empty': 'Please Enter FirstName',
                'only.any': 'Please Enter FirstName',
                'string.base': 'Please Enter FirstName'
            }),
            surname: Joi.string().required().messages({
                'string.empty': 'Please Enter Surname',
                'string.null': 'Please Enter FirstName'
            }),
            email: Joi.string()
                .email()
                .regex(/^[\w-\.]+@([\w-]{5}\.)+[\w-]{2,4}$/)
                .required()
                .messages({
                    'string.empty': 'Please Enter Email Address',
                    'string.email': 'Enter Valid Email Address',
                    'string.pattern.base': 'Please Enter Currect Email'
                }),
            mobile: Joi.string()
                .min(10)
                .max(10)
                .regex(/^[\d]{10}$/)
                .required()
                .messages({
                    'string.empty': 'Please Enter A Mobile Number',
                    'string.min': 'Mobile Number Must Be At Least 10 Characters',
                    'string.max': 'Please Enter Maximum 10 Numbers',
                    'string.pattern.base': 'Wrong Number Format'
                }),
            gstNum: Joi.string()
                .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$/)
                .required()
                .messages({
                    'string.empty': 'Please Enter A Valid GST Number',
                    'string.pattern.base': 'Your GST Number Is Invalid'
                }),
            password: Joi.string().min(6).required().messages({
                'string.empty': 'Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'"
            })
        })
        validData(req.body, schema, res, next)
    },
    // login validatior
    async SellerLogin(req, res, next) {
        // create a object with Joi
        const schema = await Joi.object({
            email: Joi.string().optional().messages({
                'string.empty': 'Please Enter Email Address',
                'string.email': 'Enter Valid Email Address'
            }),
            // if sometime check username to use it patter [A-Z\d][A-Z\d_-]{5,10}
            emailPhone: Joi.string()
                .regex(/^(?:[\d]{10}|[\w-\.]+@([\w-]{5}\.)+[\w-]{2,4})$/i)
                .required()
                .messages({
                    'string.empty': 'Invalid Empty Filled',
                    'string.pattern.base': 'Invalid Email Or Phone'
                }),
            password: Joi.string().min(6).required().messages({
                'string.empty': 'Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'"
            })
        })
        validData(req.body, schema, res, next)
    },
    // login change seller details
    async SellerChangePassword(req, res, next) {
        // create a object with Joi
        const schema = await Joi.object({
            oldpassword: Joi.string().min(6).required().messages({
                'string.empty': 'Old Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'"
            }),
            newpassword: Joi.string().min(6).required().messages({
                'string.empty': 'New Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'"
            }),
            cnewpassword: Joi.string().min(6).valid(Joi.ref('newpassword')).required().messages({
                'string.empty': 'Confrom Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'",
                'any.only': 'Confirm password does not match'
            })
        })
        validData(req.body, schema, res, next)
    },
    // reset password validation
    async SellerResetPassword(req, res, next) {
        // create a object with Joi
        const schema = await Joi.object({
            npassword: Joi.string().min(6).required().messages({
                'string.empty': 'New Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'"
            }),
            cpassword: Joi.string().min(6).valid(Joi.ref('npassword')).required().messages({
                'string.empty': 'Confrom Password Is Required',
                'string.min': "'Password Length Must Be At Least {{#limit}} Characters Long'",
                'any.only': 'Confirm password does not match'
            })
        })
        validData(req.body, schema, res, next)
    },
    // reset password validation
    async Seller_Update_Details(req, res, next) {
        // create a object with Joi
        const schema = await Joi.object({
            firstname: Joi.string().required().messages({
                'string.empty': 'First Name Is Required'
            }),
            surname: Joi.string().required().messages({
                'string.empty': 'surname Is Required'
            }),
            mobile: Joi.string()
                .min(10)
                .max(10)
                .regex(/^[\d]{10}$/)
                .required({
                    'string.empty': 'Mobile Number is Required',
                    'string.min': "'Number Length Must Be At Least {{#limit}} Characters Long'",
                    'any.only': 'Mobile Number is Required'
                }),
            email: Joi.string()
                .regex(/^[\w-\.]+@([\w-]{5,12}\.)+[\w-]{2,4}$/)
                .required()
                .messages({
                    'string.empty': 'Email is Required',
                    'any.only': 'Email is Required',
                    'string.pattern.base': 'Email Not Validate'
                }),

            fullAddress: Joi.object({
                state: Joi.string().required().messages({ 'string.empty': 'Enter Your Current State' }),
                address: Joi.string().required().messages({
                    'string.empty': 'address is Required'
                }),
                city: Joi.string().required().messages({ 'string.empty': 'city is Required' }),
                pincode: Joi.number().min(6).required().messages({
                    'number.min': "'Pincode Length Must Be At Least {{#limit}} Characters Long'",
                    'number.empty': 'Pincode is Required'
                }),
                country: Joi.string().required().messages({ 'string.empty': 'Country is Required' })
            }),
            bussinessDetail: Joi.object({
                bussinessName: Joi.string().required().messages({ 'string.empty': 'Bussiness Name is Required' }),
                company: Joi.string().required().messages({ 'string.empty': 'Company Name is Required' }),
                panNum: Joi.string()
                    .optional()
                    .regex(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)
                    .messages({
                        'string.pattern.base': 'Pan Number Not Validate'
                    }),
                companyAddress: Joi.object({
                    state: Joi.required().messages({
                        'string.empty': 'State Name is Required'
                    }),
                    city: Joi.string().required().messages({ 'string.empty': 'Citi Name is Required' }),
                    address: Joi.string().required().messages({
                        'string.empty': 'address is Required'
                    }),
                    pincode: Joi.number().min(6).required().messages({
                        'number.min': "'Pincode Length Must Be At Least {{#limit}} Characters Long'",
                        'number.empty': 'Pincode is Required'
                    }),
                    country: Joi.string().required().messages({ 'string.empty': 'Country is Required' })
                })
            })
        }).unknown(true)
        validData(req.body, schema, res, next)
    }
}

export default SellerauthMiddleware
