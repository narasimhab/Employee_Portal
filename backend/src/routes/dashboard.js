import express from 'express'
import { getDashboardStats, getAnnouncements } from '../controllers/dashboardController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.get('/stats', authenticate, getDashboardStats)
router.get('/announcements', authenticate, getAnnouncements)

export default router
