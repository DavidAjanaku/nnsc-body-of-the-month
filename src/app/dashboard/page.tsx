import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Stats } from "@/components/dashboard/Stats";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

// const prisma = new PrismaClient(); // Removed

async function getUserData(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            measurements: {
                orderBy: { date: 'desc' },
                take: 12 // Last 12 entries
            }
        }
    });
    return user;
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/auth/register");
    }

    const user = await getUserData(userId);

    if (!user) {
        redirect("/auth/register");
    }

    // Format data for chart
    const chartData = [...user.measurements].reverse().map(m => ({
        date: format(new Date(m.date), "MMM d"),
        weight: m.weight || 0
    }));

    const currentWeight = user.currentWeight || 0;

    return (
        <main className="min-h-screen bg-background relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Dashboard</h1>
                        <p className="text-muted-foreground text-lg">Welcome back, <span className="text-primary font-bold">{user.name}</span></p>
                    </div>
                    <Link href="/dashboard/measurements/new">
                        <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/25 border-0 font-bold uppercase tracking-wide group transition-all duration-300 hover:scale-105">
                            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Add Measurements
                        </Button>
                    </Link>
                </div>

                <div className="space-y-8">
                    <Stats
                        weight={currentWeight}
                        workoutsCompleted={12} // Mock
                        nextCompetition="Feb 7"
                        rank={42} // Mock
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                        <div className="lg:col-span-4">
                            <ProgressChart data={chartData} />
                        </div>
                        <div className="lg:col-span-2">
                            {/* Placeholder for Recent Activity or Goals */}
                            <div className="h-full rounded-lg border border-white/5 bg-card/40 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center">
                                <h3 className="text-lg font-bold uppercase tracking-wide mb-4">Your Goals</h3>
                                <p className="text-muted-foreground text-sm italic">"{user.goals || "No goals set yet."}"</p>
                                <Link href="/dashboard/settings" className="mt-6">
                                    <Button variant="outline" size="sm">Update Goals</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
