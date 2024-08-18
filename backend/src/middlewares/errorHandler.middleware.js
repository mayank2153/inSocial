import { ApiError } from "../utils/ApiError.js";

function errorHandler  (err, req, res, next) {
    if(err instanceof ApiError){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            stack: err.stack,
        });
    }else{
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred',
            errors: [],
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }
}

export default errorHandler;
