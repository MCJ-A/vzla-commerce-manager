"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getExchangeRate() {
    const exchangeRate = await prisma.exchangeRate.findUnique({
        where: { currency: "VES" },
    });

    if (!exchangeRate) return null;

    return {
        ...exchangeRate,
        rate: exchangeRate.rate.toNumber(),
    };
}

export async function updateExchangeRate(newRate: number) {
    try {
        const updatedRate = await prisma.exchangeRate.upsert({
            where: { currency: "VES" },
            update: { rate: newRate },
            create: {
                currency: "VES",
                rate: newRate,
            },
        });

        revalidatePath("/");
        revalidatePath("/inventory");
        revalidatePath("/settings");

        return {
            success: true,
            message: "Tasa actualizada correctamente",
            data: {
                ...updatedRate,
                rate: updatedRate.rate.toNumber()
            }
        };
    } catch (error) {
        console.error("Error updating exchange rate:", error);
        return { success: false, message: "Error al actualizar la tasa" };
    }
}
