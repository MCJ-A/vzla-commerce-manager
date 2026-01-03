"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { productSchema, ProductFormValues } from "@/lib/schemas";
import { updateProduct } from "@/app/actions/update-product";
import { InventoryProduct } from "@/app/(dashboard)/inventory/columns";

interface EditProductSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: InventoryProduct;
}

export function EditProductSheet({ open, onOpenChange, product }: EditProductSheetProps) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: product.name,
            sku: product.sku,
            priceUSD: product.priceUSD,
            stock: product.stock,
            category: product.category,
            status: product.status as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK",
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                name: product.name,
                sku: product.sku,
                priceUSD: product.priceUSD,
                stock: product.stock,
                category: product.category,
                status: product.status as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK",
            });
        }
    }, [open, product, form]);

    async function onSubmit(data: ProductFormValues) {
        const result = await updateProduct(product.id, data);

        if (result.success) {
            toast.success(result.message);
            onOpenChange(false);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Editar Producto</SheetTitle>
                    <SheetDescription>
                        Modifica los detalles del producto seleccionado.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Laptop Gamer..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SKU</FormLabel>
                                        <FormControl>
                                            <Input placeholder="LAP-001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="priceUSD"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Precio (USD)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoría</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Computación..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="IN_STOCK">En Stock</SelectItem>
                                                <SelectItem value="LOW_STOCK">Stock Bajo</SelectItem>
                                                <SelectItem value="OUT_OF_STOCK">Sin Stock</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
