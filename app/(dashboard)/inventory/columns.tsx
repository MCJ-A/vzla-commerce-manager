"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { InventoryActions } from "@/components/inventory/InventoryActions";

export type InventoryProduct = {
    id: string;
    name: string;
    sku: string;
    priceUSD: number;
    priceBs: number;
    stock: number;
    status: string;
    category: string;
};

export const columns: ColumnDef<InventoryProduct>[] = [
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "priceUSD",
        header: () => <div className="text-right">Precio</div>,
        cell: ({ row }) => {
            const priceUSD = row.original.priceUSD;
            const priceBs = row.original.priceBs;

            const formattedUsd = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(priceUSD);

            const formattedBs = new Intl.NumberFormat("es-BO", {
                style: "currency",
                currency: "BOB",
            }).format(priceBs);

            return (
                <div className="text-right font-medium">
                    <div className="text-green-600">{formattedUsd}</div>
                    <div className="text-xs text-muted-foreground">{formattedBs}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-right">Stock</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("stock")}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const variant =
                status === "IN_STOCK" ? "default" :
                    status === "LOW_STOCK" ? "secondary" :
                        "destructive";

            const label =
                status === "IN_STOCK" ? "In Stock" :
                    status === "LOW_STOCK" ? "Low Stock" :
                        "Out of Stock";

            const className =
                status === "IN_STOCK" ? "bg-green-500 hover:bg-green-600" :
                    status === "LOW_STOCK" ? "bg-yellow-500 hover:bg-yellow-600" :
                        "";

            return (
                <Badge variant={variant} className={className}>
                    {label}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <InventoryActions product={row.original} />,
    },
];
