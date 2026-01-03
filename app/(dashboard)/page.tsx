import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, Activity } from "lucide-react";
import { getDashboardStats } from "@/app/actions/get-dashboard-stats";
import { OverviewChart } from "@/components/OverviewChart";

export default async function Home() {
  const { totalProducts, totalStock, totalValueUSD, totalValueVES, categoryData } =
    await getDashboardStats();

  const formattedUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalValueUSD);

  const formattedVES = new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "VES",
  }).format(totalValueVES);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Total (USD)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedUSD}</div>
            <p className="text-xs text-muted-foreground">
              {formattedVES} (aprox)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">items únicos registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
            <p className="text-xs text-muted-foreground">unidades en almacén</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 md:col-span-7">
          <CardHeader>
            <CardTitle>Resumen de Inventario</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={categoryData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
