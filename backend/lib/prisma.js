import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
  // 👇 THIS IS REQUIRED FOR MYSQL 8
  allowPublicKeyRetrieval: true 
})

const prisma = global.prisma || new PrismaClient({ adapter });

export default prisma