"use server";

import { prisma } from "@/lib/prisma";
import { productSchema, ProductFormValues } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createProduct(data: ProductFormValues) {
    const result = productSchema.safeParse(data);

    if (!result.success) {
        return { success: false, message: "Datos inválidos" };
    }

    const { sku, name, priceUSD, stock, category, status } = result.data;

    try {
        const existingProduct = await prisma.product.findUnique({
            where: { sku },
        });

        if (existingProduct) {
            return { success: false, message: "El SKU ya existe" };
        }

        await prisma.product.create({
            data: {
                name,
                sku,
                priceUSD,
                stock,
                category,
                status,
            },
        });

        revalidatePath("/inventory");
        return { success: true, message: "Producto creado exitosamente" };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, message: "Error al crear el producto" };
    }
}
