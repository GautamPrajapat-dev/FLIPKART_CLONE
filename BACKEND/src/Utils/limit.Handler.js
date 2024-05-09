const { rateLimit } = require("express-rate-limit");

const limit = {
  loginlimit: rateLimit({
    // max: 3,
    windowMs: 60 * 60 * 1000,
    handler: function (req, res) {
      res.status(429).json({
        status: false,
        errorMessage:
          "We have Received too many requests for this ip.Please try After One Hour",
      });
      return false;
    },
  }),
  changePassLImit: rateLimit({
    max: 3,
    windowMs: 60 * 60 * 1000,
    handler: function (req, res) {
      return res.status(429).json({
        status: false,
        errorMessage: "to many arguments.Please try After One Hour",
      });
    },
  }),
};

module.exports = limit;
