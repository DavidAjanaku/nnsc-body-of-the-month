"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface ProgressChartProps {
    data: { date: string; weight: number }[];
}

export function ProgressChart({ data }: ProgressChartProps) {
    return (
        <Card className="col-span-4 bg-card/40 border-white/5 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold uppercase tracking-wide">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#525252"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#a3a3a3' }}
                            />
                            <YAxis
                                stroke="#525252"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}kg`}
                                domain={['dataMin - 5', 'dataMax + 5']}
                                tick={{ fill: '#a3a3a3' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #262626',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                                }}
                                itemStyle={{ color: '#fff' }}
                                labelStyle={{ color: '#a3a3a3' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="weight"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorWeight)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
