
import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 30000,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const count = await prisma.product.count();
        console.log('Total Products in DB:', count);

        if (count > 0) {
            const first = await prisma.product.findFirst();
            console.log('First Product:', first);
        } else {
            console.log('Database is empty of products.');
        }

        const rate = await prisma.exchangeRate.findUnique({ where: { currency: 'VES' } });
        console.log('Exchange Rate:', rate);

    } catch (e) {
        console.error('Error connecting to DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
