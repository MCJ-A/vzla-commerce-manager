"use server";

import { prisma } from "@/lib/prisma";
import { productSchema, ProductFormValues } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function updateProduct(productId: string, data: ProductFormValues) {
    const validatedFields = productSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, message: "Datos inválidos" };
    }

    try {
        await prisma.product.update({
            where: { id: productId },
            data: validatedFields.data,
        });

        revalidatePath("/");
        revalidatePath("/inventory");
        revalidatePath("/dashboard");

        return { success: true, message: "Producto actualizado correctamente" };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "Error al actualizar el producto" };
    }
}
