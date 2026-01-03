import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding database...')

    // 1. Initial Exchange Rate
    const exchangeRate = await prisma.exchangeRate.upsert({
        where: { currency: 'VES' },
        update: {},
        create: {
            currency: 'VES',
            rate: 55.00,
        },
    })
    console.log({ exchangeRate })

    // 2. Seed Products
    const productsData = [
        { name: 'Laptop Gamer X1', sku: 'LAP-001', priceUSD: 1200.00, stock: 15, category: 'Computers', status: 'IN_STOCK' },
        { name: 'Mouse Wireless Pro', sku: 'ACC-023', priceUSD: 45.00, stock: 50, category: 'Accessories', status: 'IN_STOCK' },
        { name: 'Monitor 27" 4K', sku: 'MON-102', priceUSD: 350.00, stock: 3, category: 'Monitors', status: 'LOW_STOCK' },
        { name: 'Teclado Mecánico RGB', sku: 'KB-055', priceUSD: 85.00, stock: 0, category: 'Accessories', status: 'OUT_OF_STOCK' },
        { name: 'Auriculares Gaming', sku: 'AUD-009', priceUSD: 60.00, stock: 25, category: 'Audio', status: 'IN_STOCK' },
        { name: 'Silla Ergonómica', sku: 'FUR-001', priceUSD: 200.00, stock: 8, category: 'Furniture', status: 'LOW_STOCK' },
        { name: 'Webcam HD', sku: 'CAM-012', priceUSD: 50.00, stock: 12, category: 'Peripherals', status: 'IN_STOCK' },
        { name: 'Disco SSD 1TB', sku: 'STO-033', priceUSD: 90.00, stock: 40, category: 'Storage', status: 'IN_STOCK' },
        { name: 'Cable HDMI 2.1', sku: 'CBL-099', priceUSD: 15.00, stock: 100, category: 'Cables', status: 'IN_STOCK' },
        { name: 'Docking Station USB-C', sku: 'ACC-045', priceUSD: 110.00, stock: 5, category: 'Accessories', status: 'LOW_STOCK' },
        { name: 'Laptop Ultrabook Z', sku: 'LAP-002', priceUSD: 950.00, stock: 10, category: 'Computers', status: 'IN_STOCK' },
        { name: 'Monitor Curvo 34"', sku: 'MON-105', priceUSD: 500.00, stock: 2, category: 'Monitors', status: 'LOW_STOCK' },
        { name: 'Tablet Pro 11"', sku: 'TAB-001', priceUSD: 750.00, stock: 20, category: 'Tablets', status: 'IN_STOCK' },
        { name: 'Smartphone Stand', sku: 'ACC-088', priceUSD: 12.00, stock: 200, category: 'Accessories', status: 'IN_STOCK' },
        { name: 'Microphone USB', sku: 'AUD-015', priceUSD: 130.00, stock: 15, category: 'Audio', status: 'IN_STOCK' },
    ]

    for (const p of productsData) {
        const product = await prisma.product.upsert({
            where: { sku: p.sku },
            update: {},
            create: p,
        })
        console.log(`Created product with id: ${product.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
