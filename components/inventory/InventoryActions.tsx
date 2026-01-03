"use client";

import { useState } from "react";
import { MoreHorizontal, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/app/actions/delete-product";
import { toast } from "sonner";
import { InventoryProduct } from "@/app/(dashboard)/inventory/columns";
import { EditProductSheet } from "./EditProductSheet";

interface InventoryActionsProps {
    product: InventoryProduct;
}

export function InventoryActions({ product }: InventoryActionsProps) {
    const [open, setOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const result = await deleteProduct(product.id);
            if (result.success) {
                toast.success(result.message);
                setOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Error desconocido al eliminar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <EditProductSheet
                open={showEdit}
                onOpenChange={setShowEdit}
                product={product}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(product.sku)}
                    >
                        Copiar SKU
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowEdit(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el
                            producto <strong>{product.name}</strong> y lo removerá de nuestros
                            servidores.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            disabled={loading}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {loading ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
