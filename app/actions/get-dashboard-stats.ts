"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getDashboardStats() {
    // Inicializamos valores por defecto (Fail-safe)
    const fallback = {
        totalProducts: 0,
        totalStock: 0,
        totalValueUSD: 0,
        totalValueVES: 0,
        categoryData: [],
    };

    try {
        // 1. Verificación de usuario (Opcional, pero recomendada)
        const { userId } = await auth();
        if (!userId) return fallback;

        // 2. Ejecución SECUENCIAL (Evita saturar el pool de conexiones)

        // A. Conteo Total
        const totalProducts = await prisma.product.count();

        // B. Stock Total (Suma)
        const stockAggregation = await prisma.product.aggregate({
            _sum: {
                stock: true,
            },
        });

        // C. Valor del Inventario (Solo campos necesarios)
        const productsForValue = await prisma.product.findMany({
            select: {
                priceUSD: true,
                stock: true,
            },
        });

        // D. Datos por Categoría
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categoryGroups = await prisma.product.groupBy({
            by: ["category"],
            _count: {
                category: true,
            },
        });

        // E. Tasa de Cambio
        const exchangeRate = await prisma.exchangeRate.findUnique({
            where: { currency: "VES" },
        });

        // 3. Cálculos en Memoria (Safe Math)
        const totalStock = stockAggregation._sum.stock || 0;

        const totalValueUSD = productsForValue.reduce((acc: number, curr: typeof productsForValue[number]) => {
            // Convertir a Number por seguridad y manejar posibles nulos
            const price = Number(curr.priceUSD) || 0;
            const stock = curr.stock || 0;
            return acc + price * stock;
        }, 0);

        const tasa = exchangeRate?.rate ? Number(exchangeRate.rate) : 0;
        const totalValueVES = totalValueUSD * tasa;

        // 4. Formateo para Gráficos
        const categoryData = categoryGroups.map((group: any) => ({
            name: group.category,
            value: group._count.category,
        }));

        return {
            totalProducts,
            totalStock,
            totalValueUSD,
            totalValueVES,
            categoryData,
        };

    } catch (error) {
        // Log del error para depuración backend, pero no rompemos el frontend
        console.error("CRITICAL ERROR in getDashboardStats:", error);
        return fallback;
    }
}
