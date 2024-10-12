// class ApiError extends Error {
//     constructor(statusCode, errorMessage = 'somthing went wrong', errors = [], stack = '') {
//         super(errorMessage)
//         this.statusCode = statusCode
//         this.data = null
//         this.errors = errors
//         this.errorMessage = errorMessage
//         this.success = false

import logger from './logger.js'

//         if (!stack) {
//             this.stack = stack
//         } else {
//             Error.captureStackTrace(this, this.constructor)
//         }
//     }
// }

// res.status(500).json({ status: false, errorMessage: error.message });
// export default ApiError

const errorObj = (err, statusCode = 500) => {
    const obj = {
        status: false,
        statusCode: statusCode,
        errorMessage: err instanceof Error ? err.message || 'Somthing Went Wrong' : 'Somthing Went Wrong',
        trace: { error: err.stack } || null
    }
    // log
    logger.error('Controller Error', { meta: obj })

    if (process.env.NODE_ENV === 'production') {
        delete errorObj.trace
    }
    return obj
}

const HttpError = (next, err, status, req) => {
    const errs = errorObj(err, status, req)
    return next(errs)
}
export default HttpError
