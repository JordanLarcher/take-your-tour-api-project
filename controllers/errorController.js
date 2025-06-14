const AppError = require('../utils/appError');

const handleCastErrorDB = err=> {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        error: err,
        status: err.status,
        message: err.message,
        stack: err.stack,
    })
}

const handleDuplicatedFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
    const message = `Duplicated field value: ${value}. Please use another value`;
    return new AppError(message, 400);
}

const sendErrorProd = (err, res) => {

    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};

module.exports = (err, req, res, next ) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 500;

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if(process.env.NODE_ENV === 'production') {

        let error = {...err};

        if(error.name === 'CasError') error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicatedFieldsDB(error);
        sendErrorProd(error, res);
    }

}