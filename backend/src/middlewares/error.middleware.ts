import { Response ,Request , NextFunction } from "express";

class AppError extends Error {
    statusCode:number;
    isOperational: boolean;
    
    constructor(message : string , statusCode:number){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
    }
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
        console.error(err);
    

    const message = err.isOperational ? err.message : 'Internal Server Error'
    const statusCode = err.isOperational ? err.statusCode : 500

    res.status(statusCode).json({
        success: false,
        message: message,
    })
}

export { AppError }