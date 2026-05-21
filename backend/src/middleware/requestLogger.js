import logger from '../config/logger.js'

export const requestLogger = (req, res, next) => {
  logger.http(`${req.method} ${req.path}`)
  
  res.on('finish', () => {
    logger.http(`${req.method} ${req.path} - ${res.statusCode}`)
  })
  
  next()
}
