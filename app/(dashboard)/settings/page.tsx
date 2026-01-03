import { getExchangeRate } from "@/app/actions/settings";
import { ExchangeRateCard } from "@/components/settings/ExchangeRateCard";

export default async function SettingsPage() {
    const exchangeRate = await getExchangeRate();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
                <p className="text-muted-foreground">
                    Administra las variables globales del sistema ERP.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="col-span-2">
                    <ExchangeRateCard initialRate={exchangeRate} />
                </div>
            </div>
        </div>
    );
}
