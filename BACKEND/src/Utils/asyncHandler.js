// const asyncHandler = (fun) => {
//   return (req, res, next) => {
//     fun(req, res, next).catch((error) => {
//       console.log(error);
//       const err = new Error(error.message);
//       err.code = error.code;
//       next(err);
//       // res.status(500).json({ status: false, errorMessage: error.message });
//     });
//   };

import HttpError from './ApiError.js';

// };
const asyncHandler = (fun) => {
    return (req, res, next) =>
        Promise.resolve(fun(req, res, next)).catch((error) => {
            HttpError(next, error, error.satus, req, res);
        });
};
export default asyncHandler;
