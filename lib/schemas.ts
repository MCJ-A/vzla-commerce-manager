import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    sku: z.string().min(3, "El SKU debe tener al menos 3 caracteres"),
    priceUSD: z.coerce
        .number()
        .min(0.01, "El precio debe ser mayor a 0"),
    stock: z.coerce
        .number()
        .int("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),
    category: z.string().min(2, "La categoría es requerida"),
    status: z.enum(["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
