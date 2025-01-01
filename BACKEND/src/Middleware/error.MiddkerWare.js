const errorHandler = (statusCode, err, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const statusNum = statusCode || 500;
    const message = err || 'Internal Server Error';
    if (res) {
        return res.status(statusNum).json({
            status: false,
            errorMessage: message
        });
    }
};

export default errorHandler;
