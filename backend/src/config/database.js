import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Pass@123',
  database: process.env.DB_NAME || 'employee_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
})

export const getConnection = async () => {
  try {
    return await pool.getConnection()
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

export default pool
