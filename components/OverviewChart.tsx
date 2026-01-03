"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

type OverviewChartProps = {
    data: {
        name: string;
        value: number;
    }[];
};

export function OverviewChart({ data }: OverviewChartProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="value" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
