import { asyncHandler } from '../middleware/errorHandler.js'
import pool from '../config/database.js'

export const getDashboardStats = asyncHandler(async (req, res) => {
  const conn = await pool.getConnection()

  try {
    // Get total active employees
    const [employeeResult] = await conn.query(
      'SELECT COUNT(*) as count FROM users WHERE status = ?',
      ['active']
    )
    const totalEmployees = employeeResult[0].count

    // Get active projects
    const [projectResult] = await conn.query(
      'SELECT COUNT(*) as count FROM projects WHERE status = ?',
      ['active']
    )
    const activeProjects = projectResult[0].count

    // Get pending requests (leaves + expenses)
    const [leaveResult] = await conn.query(
      'SELECT COUNT(*) as count FROM leaves WHERE status = ?',
      ['pending']
    )
    const [expenseResult] = await conn.query(
      'SELECT COUNT(*) as count FROM expenses WHERE status = ?',
      ['pending']
    )
    const pendingRequests = leaveResult[0].count + expenseResult[0].count

    // Get overall satisfaction (average rating from performance reviews)
    const [satisfactionResult] = await conn.query(
      'SELECT AVG(rating) as avg_rating FROM performance_reviews WHERE rating IS NOT NULL'
    )
    const overallSatisfaction = satisfactionResult[0].avg_rating
      ? Math.round(satisfactionResult[0].avg_rating * 20) // Convert to percentage (assuming 5-star scale)
      : 85 // Default if no reviews

    const stats = {
      totalEmployees,
      activeProjects,
      pendingRequests,
      overallSatisfaction: `${overallSatisfaction}%`
    }

    res.status(200).json({ success: true, data: stats })
  } finally {
    conn.release()
  }
})

export const getAnnouncements = asyncHandler(async (req, res) => {
  const conn = await pool.getConnection()

  try {
    const [announcements] = await conn.query('SELECT * FROM announcements ORDER BY created_at DESC')
    res.status(200).json({ success: true, data: announcements })
  } finally {
    conn.release()
  }
})
