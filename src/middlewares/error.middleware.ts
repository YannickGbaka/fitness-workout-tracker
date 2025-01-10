
import mongoose from "mongoose";
import status from "http-status";
import logger from "../config/logger.config.ts";
import ApiError from "../utils/apiErrors.util.ts";
import { config } from "dotenv";
config();

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? status.BAD_REQUEST : status.INTERNAL_SERVER_ERROR;
    const message = error.message || status[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (process.env.APP_ENV === 'production' && !err.isOperational) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = status[status.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.APP_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.APP_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

 export {
  errorConverter,
  errorHandler,
};