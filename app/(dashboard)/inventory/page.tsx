import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getInventory } from "@/app/actions/get-inventory";
import { CreateProductSheet } from "@/components/CreateProductSheet";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
    const data = await getInventory();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Inventario</h2>
                    <p className="text-muted-foreground">
                        Gestiona el inventario de productos, precios y stock.
                    </p>
                </div>
                <CreateProductSheet />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
