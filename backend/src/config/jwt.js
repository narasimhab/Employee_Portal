import jwt from 'jsonwebtoken'
import logger from './logger.js'

const generateToken = (payload, expiresIn = '7d') => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET || 'your_secret_key', { expiresIn })
  } catch (error) {
    logger.error(`Token generation failed: ${error.message}`)
    throw error
  }
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key')
  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`)
    throw error
  }
}

export { generateToken, verifyToken }
