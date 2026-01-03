"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
    try {
        await prisma.product.delete({
            where: { id: productId },
        });

        revalidatePath("/");
        revalidatePath("/inventory");
        revalidatePath("/dashboard");

        return { success: true, message: "Producto eliminado correctamente" };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, message: "No se pudo eliminar el producto" };
    }
}
