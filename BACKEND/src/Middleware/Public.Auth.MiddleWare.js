const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function validData(data, schema, res, next) {
  try {
    await schema.validateAsync({ ...data });
    next();
  } catch (error) {
    res.send({ status: false, errorMessage: error.details[0].message });
    return false;
  }
}

// check validations for authorization
const PublicAuthMiddleware = {
  async validUser(req, res, next) {
    // const token = req.headers.authorization.split(" ")[1];
    // const token = req.cookies.token;
    // if token undefined then return error
    if (req.headers.authorization === undefined) {
      await res.status(403).json({
        status: false,
        message: "You are not Allow to access this page",
      });
      return false;
    }

    // split bearer token into token
    const token = req.headers.authorization.split(" ")[1];
    // check token undefined
    if (token === undefined) {
      // authorization check header is undefined to send error
      if (req.headers.authorization === undefined) {
        await res.status(403).json({
          status: false,
          message: "You are not Allow to access",
        });
      }
      return false;
    }
    try {
      // verify jwt token to secret key
      const verify = await jwt.verify(token, process.env.SECRET_KEY);
      // send response user details
      res.user = verify;

      next();
    } catch (error) {
      await res.status(401).json({ message: error.message });
    }
  },
  async PublicAuthSignUpMiddleware(req, res, next) {
    const schema = await Joi.object({
      firstname: Joi.string().required().messages({
        "string.empty": "Please Enter FirstName",
      }),
      surname: Joi.string().required().messages({
        "string.empty": "Please Enter Surname",
      }),
      email: Joi.string().email().required().messages({
        "string.empty": "Please Enter Email Address",
        "string.email": "Enter Valid Email Address",
      }),
      mobile: Joi.string()
        .min(10)
        .max(10)
        .regex(/^[0-9]{10}$/)
        .required()
        .messages({
          "string.empty": "Please Enter A Mobile Number",
          "string.min": "Mobile Number Must Be At Least {{#limit}} Characters",
          "string.max": "Please Enter Maximum {{#limit}} Numbers",
          "string.pattern.base": "Wrong Number Format",
        }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password Is Required",
        "string.min":
          "'Password Length Must Be At Least {{#limit}} Characters Long'",
      }),
    });
    validData(req.body, schema, res, next);
  },
  async PublicAuthLoginMiddleware(req, res, next) {
    const schema = await Joi.object({
      emailPhone: Joi.string()
        .regex(/^(?:[0-9]{10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i)
        .required()
        .messages({
          "string.empty": "Invalid Empty Filled",
          "string.pattern.base": "Invalid Email Or Phone",
        }),
      password: Joi.string().min(4).required().messages({
        "string.empty": "Password Is Required",
        "string.min":
          "'Password Length Must Be At Least {{#limit}} Characters Long'",
      }),
    });
    validData(req.body, schema, res, next);
  },
  async PublicChangePassword(req, res, next) {
    // create a object with Joi
    const schema = await Joi.object({
      oldpassword: Joi.string().min(6).required().messages({
        "string.empty": "Old Password Is Required",
        "string.min":
          "'Password Length Must Be At Least {{#limit}} Characters Long'",
      }),
      newpassword: Joi.string().min(6).required().messages({
        "string.empty": "New Password Is Required",
        "string.min":
          "'Password Length Must Be At Least {{#limit}} Characters Long'",
      }),
      cnewpassword: Joi.string()
        .min(6)
        .valid(Joi.ref("newpassword"))
        .required()
        .messages({
          "string.empty": "Confrom Password Is Required",
          "string.min":
            "'Password Length Must Be At Least {{#limit}} Characters Long'",
          "any.only": "Confirm password does not match",
        }),
    });
    validData(req.body, schema, res, next);
  },
  async PublicResetPassword(req, res, next) {
    // create a object with Joi
    const schema = await Joi.object({
      npassword: Joi.string().min(6).required().messages({
        "string.empty": "New Password Is Required",
        "string.min":
          "'Password Length Must Be At Least {{#limit}} Characters Long'",
      }),
      cpassword: Joi.string()
        .min(6)
        .valid(Joi.ref("npassword"))
        .required()
        .messages({
          "string.empty": "Confrom Password Is Required",
          "string.min":
            "'Password Length Must Be At Least {{#limit}} Characters Long'",
          "any.only": "Confirm password does not match",
        }),
    });
    validData(req.body, schema, res, next);
  },
};

module.exports = PublicAuthMiddleware;
