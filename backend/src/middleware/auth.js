import { verifyToken } from '../config/jwt.js'
import AppError from '../utils/AppError.js'
import logger from '../config/logger.js'

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' })
    }

    const decoded = verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    logger.error(`Authentication failed: ${error.message}`)
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' })
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' })
    }

    next()
  }
}
