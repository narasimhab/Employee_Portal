import { asyncHandler } from '../middleware/errorHandler.js'
import { generateToken, verifyToken } from '../config/jwt.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import pool from '../config/database.js'
import logger from '../config/logger.js'

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    })
  }

  const conn = await pool.getConnection()

  try {
    // Find user by email
    const [users] = await conn.query(
      'SELECT id, first_name, last_name, email, password_hash, role, status FROM users WHERE email = ?',
      [email]
    )

    if (users.length === 0) {
      logger.warn(`Login attempt with non-existent email: ${email}`)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const user = users[0]

    // Check if user is active
    if (user.status !== 'active') {
      logger.warn(`Login attempt with inactive user: ${email}`)
      return res.status(401).json({
        success: false,
        message: 'Your account is not active',
      })
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash)

    if (!isPasswordValid) {
      logger.warn(`Failed login attempt for user: ${email}`)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Generate JWT token
    const token = generateToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      '7d'
    )

    // Create session record
    await conn.query(
      'INSERT INTO user_sessions (user_id, token_hash, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [user.id, token.substring(0, 50), req.ip, req.get('user-agent')]
    )

    logger.info(`User logged in: ${email}`)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    logger.error(`Login error: ${error.message}`)
    throw error
  } finally {
    conn.release()
  }
})

export const logout = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = req.user?.id

  if (token && userId) {
    const conn = await pool.getConnection()

    try {
      await conn.query('DELETE FROM user_sessions WHERE user_id = ? AND token_hash = ?', [
        userId,
        token.substring(0, 50),
      ])

      logger.info(`User logged out: ${userId}`)
    } catch (error) {
      logger.error(`Logout database error: ${error.message}`)
    } finally {
      conn.release()
    }
  }

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  })
})

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }

  const conn = await pool.getConnection()

  try {
    const [users] = await conn.query(
      `SELECT 
        u.id, u.first_name, u.last_name, u.email, u.role, u.phone,
        u.status, u.avatar_url, d.name as department
      FROM users u
      LEFT JOIN departments d ON u.department_id = d.id
      WHERE u.id = ?`,
      [userId]
    )

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const user = users[0]

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`)
    throw error
  } finally {
    conn.release()
  }
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body
  const userId = req.user?.id

  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'New passwords do not match',
    })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    })
  }

  const conn = await pool.getConnection()

  try {
    const [users] = await conn.query('SELECT password_hash FROM users WHERE id = ?', [userId])

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, users[0].password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      })
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password
    await conn.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId])

    logger.info(`Password changed for user: ${userId}`)

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    logger.error(`Change password error: ${error.message}`)
    throw error
  } finally {
    conn.release()
  }
})
