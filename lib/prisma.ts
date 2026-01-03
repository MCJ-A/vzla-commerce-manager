import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({
    connectionString,
    max: 10, // Limit pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 60000, // 60 seconds timeout
})
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
