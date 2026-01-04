"use server";

import { prisma } from "@/lib/prisma";

export async function getInventory() {
    try {
        // 1. Verificación básica (opcional, si quisieras bloquear acceso)
        // const { userId } = auth(); if (!userId) return [];

        // 2. Consultas Secuenciales (Más robusto)
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        const exchangeRate = await prisma.exchangeRate.findUnique({
            where: { currency: "VES" },
        });

        const tasa = exchangeRate?.rate ? Number(exchangeRate.rate) : 0;

        return products.map((product: any) => {
            return {
                id: product.id,
                name: product.name,
                sku: product.sku,
                stock: product.stock,
                category: product.category,
                status: product.status,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                priceUSD: product.priceUSD.toNumber(),
                priceBs: product.priceUSD.toNumber() * tasa,
                rateUsed: tasa,
            };
        });
    } catch (error) {
        console.error("Error fetching inventory:", error);
        // Silent fail: Devolver array vacío para no romper la UI
        return [];
    }
}
