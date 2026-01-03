"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
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
import { createProduct } from "@/app/actions/create-product";

export function CreateProductSheet() {
    const [open, setOpen] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: "",
            sku: "",
            priceUSD: 0,
            stock: 0,
            category: "",
            status: "IN_STOCK",
        },
    });

    async function onSubmit(data: ProductFormValues) {
        const result = await createProduct(data);

        if (result.success) {
            toast.success(result.message);
            form.reset();
            setOpen(false);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Agregar Producto
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Crear Nuevo Producto</SheetTitle>
                    <SheetDescription>
                        Ingresa los detalles del nuevo producto para añadirlo al inventario.
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
                                {form.formState.isSubmitting ? "Guardando..." : "Guardar Producto"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
