const asyncHandler = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      console.log(error);
      res.status(500).json({ status: false, errorMessage: error.message });
    });
  };
};
module.exports = asyncHandler;
