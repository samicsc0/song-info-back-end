"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, errorStatusCode = 500) {
        super(message);
        this.errorStatusCode = 500;
        this.status = "";
        this.isOperational = true;
        this.errorStatusCode = errorStatusCode;
        this.status =
            errorStatusCode >= 400 && errorStatusCode <= 500 ? "Fail" : "Error";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomError;
