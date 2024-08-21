class ApiError extends Error {
    constructor(statusCode, errorMessage = 'somthing went wrong', errors = [], stack = '') {
        super(errorMessage)
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.errorMessage = errorMessage
        this.success = false

        if (!stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = ApiError
