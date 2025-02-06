"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.errorHandler = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const message = err.isOperational ? err.message : 'Internal Server Error';
    const statusCode = err.isOperational ? err.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: message,
    });
};
exports.errorHandler = errorHandler;
