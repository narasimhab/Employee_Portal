/**
 * Sets demo user password_hash to bcrypt("password123", 10).
 * Run from repo: npm run fix-demo-passwords (in backend folder)
 */
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env') })

const DEMO_HASH =
  '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6'

const DEMO_EMAILS = [
  'john.smith@company.com',
  'sarah.johnson@company.com',
  'michael.chen@company.com',
  'emma.wilson@company.com',
  'david.brown@company.com',
  'lisa.davis@company.com',
  'james.miller@company.com',
  'jennifer.lee@company.com',
  'daniel.kim@company.com',
  'sophia.garcia@company.com',
]

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Pass@123',
    database: process.env.DB_NAME || 'employee_portal',
  })

  try {
    for (const email of DEMO_EMAILS) {
      const [result] = await conn.execute(
        'UPDATE users SET password_hash = ? WHERE email = ?',
        [DEMO_HASH, email]
      )
      console.log(`${email}: ${result.affectedRows} row(s) updated`)
    }
    console.log('Done. Log in with password: password123')
  } finally {
    await conn.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
