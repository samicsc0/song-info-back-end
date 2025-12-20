import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils";
import { ApiError } from "../types";

export default function GlobalErrorHandlerMiddleware(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  err.errorStatusCode = err.errorStatusCode || 500;
  err.status = err.status || "Error";
  const errorResponse: ApiError = {
    errorCode: err.errorStatusCode,
    status: err.status,
    errorMessage: err.message,
    isOperational: err.isOperational,
  };
  res.status(err.errorStatusCode).json(errorResponse);
}
