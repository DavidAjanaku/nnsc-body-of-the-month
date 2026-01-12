import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Plus, Scale, Ruler, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

async function getMeasurements(userId: string) {
    const measurements = await prisma.measurement.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
    });
    return measurements;
}

export const dynamic = 'force-dynamic';

export default async function MeasurementsPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/auth/login");
    }

    const measurements = await getMeasurements(userId);

    return (
        <main className="min-h-screen bg-background pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <NavbarWrapper />

            <div className="container mx-auto px-4 pt-32 max-w-5xl relative z-10">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Return to Dashboard
                        </Link>

                        <h1 className="text-5xl font-black uppercase tracking-tighter italic text-foreground leading-none">
                            Measurement <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">History</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-md">
                            Your transformation journey, documented in detail.
                        </p>
                    </div>

                    <Link href="/dashboard/measurements/new">
                        <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/25 border-0 font-bold uppercase tracking-wide group py-6 px-8 transition-all duration-300 hover:scale-105">
                            <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Log New Entry
                        </Button>
                    </Link>
                </div>

                {measurements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border border-white/5 bg-card/10 backdrop-blur-sm">
                        <Scale className="h-24 w-24 mx-auto text-white/5 mb-6" />
                        <h3 className="text-2xl font-black uppercase italic tracking-wide mb-2 text-muted-foreground">The Record is Empty</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                            Your transformation hasn't been logged yet. Start your journey today by recording your first metrics.
                        </p>
                        <Link href="/dashboard/measurements/new">
                            <Button className="bg-primary hover:bg-primary/90">Add First Measurement</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {measurements.map((measurement: any, index: number) => {
                            const prevMeasurement = measurements[index + 1];
                            const weightChange = prevMeasurement
                                ? ((measurement.weight || 0) - (prevMeasurement.weight || 0))
                                : 0;

                            return (
                                <Card key={measurement.id} className="group relative overflow-hidden bg-card/30 border-white/5 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:translate-x-1">
                                    {/* Subtle Image Background */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="/images/hero-modern.png"
                                            alt=""
                                            className="w-full h-full object-cover opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 grayscale"
                                        />
                                    </div>

                                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary/5 to-transparent z-0 pointer-events-none" />

                                    <CardHeader className="relative z-10 pb-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <CardTitle className="text-2xl font-black italic tracking-tight text-white/90">
                                                    {format(new Date(measurement.date), "MMMM d, yyyy")}
                                                </CardTitle>
                                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Logged Performance</p>
                                            </div>

                                            {weightChange !== 0 && (
                                                <div className={cn(
                                                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md border",
                                                    weightChange < 0 ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-red-400 bg-red-400/10 border-red-400/20'
                                                )}>
                                                    {weightChange < 0 ? (
                                                        <TrendingDown className="h-4 w-4" />
                                                    ) : (
                                                        <TrendingUp className="h-4 w-4" />
                                                    )}
                                                    {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} KG
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="relative z-10 pt-0">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 border-t border-white/5 pt-6">
                                            <MetricBox label="Weight" value={measurement.weight} unit="kg" icon={Scale} primary />
                                            <MetricBox label="Chest" value={measurement.chest} unit="cm" />
                                            <MetricBox label="Arms" value={measurement.arms} unit="cm" />
                                            <MetricBox label="Waist" value={measurement.waist} unit="cm" />
                                            <MetricBox label="Thighs" value={measurement.thighs} unit="cm" />
                                            <MetricBox label="Glutes" value={measurement.glutes} unit="cm" />
                                            <MetricBox label="Neck" value={measurement.neck} unit="cm" />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

function MetricBox({ label, value, unit, icon: Icon, primary = false }: { label: string, value: number | null, unit: string, icon?: any, primary?: boolean }) {
    if (!value && !primary) return null;

    return (
        <div className="space-y-1 group/metric">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground group-hover/metric:text-primary transition-colors">
                {label}
            </p>
            <div className="flex items-baseline gap-1">
                <span className={cn(
                    "text-xl font-black italic tracking-tighter text-white",
                    primary && "text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                )}>
                    {value || '--'}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">{unit}</span>
            </div>
        </div>
    );
}

