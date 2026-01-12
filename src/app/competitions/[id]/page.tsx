import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { ArrowLeft, Trophy, Medal, Percent, Dumbbell } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RegisterButton } from "@/components/competitions/RegisterButton";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

async function getCompetition(id: string) {
    const competition = await prisma.competition.findUnique({
        where: { id },
        include: {
            entries: {
                include: {
                    user: true,
                },
                orderBy: [
                    { category: "asc" },
                    { score: "desc" },
                ],
            },
        },
    });

    if (!competition) {
        notFound();
    }

    return competition;
}

export const dynamic = 'force-dynamic';

export default async function CompetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const competition = await getCompetition(id);
    const user = await getCurrentUser();

    // Check if user is registered
    const isRegistered = user ? competition.entries.some(e => e.userId === user.id) : false;

    // Group entries by category
    const categories = [...new Set(competition.entries.map((e) => e.category))];
    const leaderboards: Record<string, any[]> = {};

    categories.forEach((category) => {
        leaderboards[category] = competition.entries
            .filter((e) => e.category === category)
            .sort((a, b) => b.score - a.score);
    });

    // Get overall winners (users with lowest sum of ranks across all categories)
    const userRankSums: Record<string, { user: any; sum: number; categories: number }> = {};

    competition.entries.forEach((entry) => {
        if (!userRankSums[entry.userId]) {
            userRankSums[entry.userId] = {
                user: entry.user,
                sum: 0,
                categories: 0,
            };
        }
        if (entry.rank) {
            userRankSums[entry.userId].sum += entry.rank;
            userRankSums[entry.userId].categories += 1;
        }
    });

    const overallRankings = Object.values(userRankSums)
        .filter((u) => u.categories > 0)
        .sort((a, b) => a.sum - b.sum);

    return (
        <main className="min-h-screen bg-background pb-20 relative overflow-hidden">
            {/* Global Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <NavbarWrapper />

            {/* Cinematic Header */}
            <div className="relative pt-32 pb-20 px-4 mb-12">
                <div className="absolute inset-0 z-0 overflow-hidden h-[500px]">
                    <img
                        src="/images/action-1.png"
                        alt="Competition background"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay blur-sm scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <Link
                        href="/competitions"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:border-primary/20"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Competitions
                    </Link>

                    <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white sm:text-7xl mb-6 drop-shadow-2xl">
                        {competition.name}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xl">
                        <span className="text-primary font-bold tracking-widest uppercase">
                            {format(new Date(competition.date), "MMMM d, yyyy")}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span
                            className={cn(
                                "font-black uppercase tracking-widest px-3 py-1 rounded bg-white/5 border border-white/10 backdrop-blur-sm",
                                competition.status === "UPCOMING" ? "text-blue-400 border-blue-400/20" :
                                    competition.status === "ACTIVE" ? "text-green-400 border-green-400/20 animate-pulse" :
                                        "text-muted-foreground"
                            )}
                        >
                            {competition.status}
                        </span>
                    </div>

                    {user && (
                        <div className="mt-8 flex justify-center">
                            <RegisterButton
                                competitionId={id}
                                isRegistered={isRegistered}
                                competitionStatus={competition.status}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-20">
                {/* Overall Winners */}
                {overallRankings.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <Trophy className="h-8 w-8 text-yellow-500" />
                            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Overall Rankings</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {overallRankings.slice(0, 3).map((ranking, index) => (
                                <div key={ranking.user.id} className={cn("relative group", index === 0 ? "md:-mt-8 z-10" : "")}>
                                    {/* Glow effect */}
                                    <div className={cn(
                                        "absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500",
                                        index === 0 ? "bg-gradient-to-b from-yellow-400 to-yellow-600" :
                                            index === 1 ? "bg-gradient-to-b from-gray-300 to-gray-500" :
                                                "bg-gradient-to-b from-orange-400 to-orange-600"
                                    )} />

                                    <Card
                                        className={cn(
                                            "relative h-full overflow-hidden border-0 bg-card/80 backdrop-blur-xl",
                                            index === 0 ? "bg-gradient-to-b from-yellow-500/10 to-transparent" :
                                                index === 1 ? "bg-gradient-to-b from-white/5 to-transparent" :
                                                    "bg-gradient-to-b from-orange-500/5 to-transparent"
                                        )}
                                    >
                                        <CardContent className="p-8 text-center flex flex-col items-center h-full">
                                            <div className="relative mb-6">
                                                <div className={cn(
                                                    "w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black border-4 shadow-xl",
                                                    index === 0 ? "border-yellow-500 bg-yellow-950 text-yellow-500" :
                                                        index === 1 ? "border-gray-400 bg-gray-900 text-gray-400" :
                                                            "border-orange-500 bg-orange-950 text-orange-500"
                                                )}>
                                                    #{index + 1}
                                                </div>
                                                {index === 0 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">👑</span>}
                                            </div>

                                            <h3 className="text-xl font-bold mb-1 truncate w-full">{ranking.user.name}</h3>
                                            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
                                                <span>RANK SUM: {ranking.sum}</span>
                                            </div>

                                            <div className="w-full mt-auto grid grid-cols-2 gap-2 text-xs text-left bg-black/20 p-3 rounded-lg border border-white/5">
                                                <div>
                                                    <p className="text-muted-foreground uppercase text-[10px]">Categories</p>
                                                    <p className="font-mono font-bold">{ranking.categories}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground uppercase text-[10px]">Status</p>
                                                    <p className="font-mono text-green-400">QUALIFIED</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Leaderboards by Category */}
                <div className="space-y-16">
                    {categories.map((category) => (
                        <div key={category} className="relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                    <Dumbbell className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-wider">{category}</h2>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            <Card className="bg-card/40 border-white/5 backdrop-blur-sm overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                                    <th className="text-left p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground w-20">
                                                        Rank
                                                    </th>
                                                    <th className="text-left p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                        Athlete
                                                    </th>
                                                    <th className="text-right p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground w-32">
                                                        Score
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {leaderboards[category].map((entry, index) => (
                                                    <tr key={entry.id} className="group hover:bg-white/[0.02] transition-colors">
                                                        <td className="p-6">
                                                            <span className={cn(
                                                                "text-xl font-black italic",
                                                                index === 0 ? "text-yellow-500" :
                                                                    index === 1 ? "text-gray-400" :
                                                                        index === 2 ? "text-orange-500" :
                                                                            "text-muted-foreground"
                                                            )}>
                                                                {index + 1}
                                                            </span>
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="flex items-center gap-4">
                                                                {entry.user.avatarUrl ? (
                                                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors">
                                                                        <Image
                                                                            src={entry.user.avatarUrl}
                                                                            alt={entry.user.name}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-white/10 group-hover:border-primary/50 transition-colors">
                                                                        <span className="font-bold text-lg text-primary">
                                                                            {entry.user.name.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{entry.user.name}</p>
                                                                    <p className="text-xs text-muted-foreground font-mono">Member</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-6 text-right">
                                                            <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">{entry.score}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {leaderboards[category].length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="p-12 text-center text-muted-foreground italic">
                                                            No entries yet. Be the first to claim glory.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border border-white/5 bg-card/10">
                        <Trophy className="h-24 w-24 mx-auto text-white/5 mb-6" />
                        <h3 className="text-2xl font-black uppercase italic tracking-wide mb-2 text-muted-foreground">Arena Empty</h3>
                        <p className="text-muted-foreground">
                            The battlefield is silent. Await orders.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
