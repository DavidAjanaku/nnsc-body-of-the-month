import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, Trophy, Dumbbell, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
export const dynamic = 'force-dynamic';


async function getAdminStats() {
    const [totalMembers, totalCompetitions, totalWorkouts, upcomingCompetitions] = await Promise.all([
        prisma.user.count({ where: { role: "MEMBER" } }),
        prisma.competition.count(),
        prisma.workout.count(),
        prisma.competition.count({ where: { status: "UPCOMING" } }),
    ]);

    return {
        totalMembers,
        totalCompetitions,
        totalWorkouts,
        upcomingCompetitions,
    };
}

export default async function AdminDashboard() {
    await requireAdmin();
    const stats = await getAdminStats();

    return (
        <main className="min-h-screen bg-background relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter">
                        Admin <span className="text-primary">Dashboard</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage members, competitions, and workouts
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Members</CardTitle>
                            <Users className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-black italic tracking-tighter">{stats.totalMembers}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-secondary/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Competitions</CardTitle>
                            <Trophy className="h-5 w-5 text-secondary" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-black italic tracking-tighter">{stats.totalCompetitions}</div>
                            <p className="text-xs text-muted-foreground font-medium mt-1">
                                {stats.upcomingCompetitions} upcoming
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-blue-400/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Workouts</CardTitle>
                            <Dumbbell className="h-5 w-5 text-blue-400" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-black italic tracking-tighter">{stats.totalWorkouts}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-green-500/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</CardTitle>
                            <Calendar className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <Link href="/admin/competitions/new">
                                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold tracking-wide">
                                    New Competition
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-card/60 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg font-bold uppercase tracking-wide">
                                <Users className="h-6 w-6 text-primary" />
                                Manage Members
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-6">
                                View all members, update roles, and manage profiles
                            </p>
                            <Link href="/admin/members">
                                <Button variant="outline" className="w-full border-white/10 hover:bg-primary/20 hover:text-primary">
                                    View Members
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm hover:border-secondary/50 hover:bg-card/60 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg font-bold uppercase tracking-wide">
                                <Trophy className="h-6 w-6 text-secondary" />
                                Competitions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-6">
                                Create competitions, enter scores, announce winners
                            </p>
                            <Link href="/admin/competitions">
                                <Button variant="outline" className="w-full border-white/10 hover:bg-secondary/20 hover:text-secondary">
                                    Manage Competitions
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-white/5 backdrop-blur-sm hover:border-blue-400/50 hover:bg-card/60 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg font-bold uppercase tracking-wide">
                                <Dumbbell className="h-6 w-6 text-blue-400" />
                                Workouts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-6">
                                Post daily workout routines and manage exercises
                            </p>
                            <Link href="/admin/workouts">
                                <Button variant="outline" className="w-full border-white/10 hover:bg-blue-400/20 hover:text-blue-400">
                                    Manage Workouts
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
