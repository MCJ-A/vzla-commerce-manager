"use client";

import { useState } from "react";
import { ExchangeRate } from "@prisma/client";
import { updateExchangeRate } from "@/app/actions/settings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Omitimos 'rate' del tipo original y lo redefinimos como number
interface PlainExchangeRate extends Omit<ExchangeRate, 'rate'> {
    rate: number;
}

interface ExchangeRateCardProps {
    initialRate: PlainExchangeRate | null;
}

export function ExchangeRateCard({ initialRate }: ExchangeRateCardProps) {
    const [rate, setRate] = useState<number>(initialRate?.rate ? initialRate.rate : 0);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const result = await updateExchangeRate(rate);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tasa de Cambio (USD/VES)</CardTitle>
                <CardDescription>
                    Define el valor actual del dólar para los cálculos automáticos del
                    sistema.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold">1 USD =</span>
                    <Input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(parseFloat(e.target.value))}
                        className="text-2xl font-bold w-40 h-14"
                        step="0.01"
                    />
                    <span className="text-3xl font-bold">VES</span>
                </div>
                {initialRate?.updatedAt && (
                    <p className="text-sm text-muted-foreground mt-4">
                        Última actualización: {new Date(initialRate.updatedAt).toLocaleString()}
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <Button onClick={handleUpdate} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Actualizando..." : "Actualizar Tasa"}
                </Button>
            </CardFooter>
        </Card>
    );
}
