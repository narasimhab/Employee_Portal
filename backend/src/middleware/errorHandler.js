import logger from '../config/logger.js'
import AppError from '../utils/AppError.js'

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  logger.error(`${err.statusCode} - ${err.message}`)

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ')
    return res.status(400).json({ success: false, message })
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
