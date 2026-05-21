import express from 'express'
import { login, logout, getProfile, changePassword } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/login', login)

// Protected routes
router.post('/logout', authenticate, logout)
router.get('/profile', authenticate, getProfile)
router.post('/change-password', authenticate, changePassword)

export default router
