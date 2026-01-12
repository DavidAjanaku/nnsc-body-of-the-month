import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { format } from "date-fns";
import { Trophy, Medal, Star, Crown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

async function getWinners() {
    // Get all completed competitions
    const competitions = await prisma.competition.findMany({
        where: {
            status: "COMPLETED",
        },
        orderBy: { date: "desc" },
        include: {
            entries: {
                include: {
                    user: {
                        include: {
                            measurements: {
                                orderBy: { date: "desc" },
                                take: 1,
                            },
                        },
                    },
                },
            },
        },
    });

    // Calculate winners for each competition
    const winners = competitions.map((competition) => {
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

        const rankings = Object.values(userRankSums)
            .filter((u) => u.categories > 0)
            .sort((a, b) => a.sum - b.sum);

        const maleWinner = rankings.find((r) => r.user.gender === "MALE");
        const femaleWinner = rankings.find((r) => r.user.gender === "FEMALE");

        return {
            competition,
            maleWinner,
            femaleWinner,
        };
    });

    return winners;
}

export const dynamic = 'force-dynamic';

export default async function HallOfFamePage() {
    const winners = await getWinners();

    return (
        <main className="min-h-screen bg-background pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-background to-background pointer-events-none" />

            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 relative z-10">
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                        <Crown className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter sm:text-7xl mb-4 text-foreground/90">
                        Hall of <span className="text-yellow-500">Immortals</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Eternal glory for those who conquered the clash.
                    </p>
                </div>

                {winners.length > 0 ? (
                    <div className="max-w-5xl mx-auto space-y-24">
                        {winners.map(({ competition, maleWinner, femaleWinner }) => (
                            <div key={competition.id} className="relative">
                                {/* Decorative Year/Month Background */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-9xl font-black text-white/[0.02] select-none whitespace-nowrap z-0 uppercase italic">
                                    {format(new Date(competition.date), "MMMM")}
                                </div>

                                <div className="relative z-10 mb-8 text-center">
                                    <h2 className="text-3xl font-bold uppercase tracking-widest text-foreground flex items-center justify-center gap-3">
                                        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-yellow-500/50" />
                                        {competition.name}
                                        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-yellow-500/50" />
                                    </h2>
                                    <p className="text-sm font-mono text-yellow-500/80 mt-2 uppercase tracking-widest">
                                        {format(new Date(competition.date), "MMMM d, yyyy")}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                                    {/* Male Winner */}
                                    {maleWinner && (
                                        <div className="group relative">
                                            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/30 to-blue-600/5 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                                            <Card className="relative border-0 bg-card/60 overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 z-20">
                                                    <Medal className="h-8 w-8 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                                </div>
                                                <div className="aspect-[4/5] relative">
                                                    {maleWinner.user.avatarUrl ? (
                                                        <Image
                                                            src={maleWinner.user.avatarUrl}
                                                            alt={maleWinner.user.name}
                                                            fill
                                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full bg-gradient-to-b from-blue-950 to-background flex items-center justify-center">
                                                            <span className="text-9xl font-black text-blue-500/20">{maleWinner.user.name.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                                        <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">Men's Champion</p>
                                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-2">{maleWinner.user.name}</h3>
                                                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                                                            <span>SCORE: {maleWinner.sum}</span>
                                                            <span className="w-1 h-1 bg-blue-500 rounded-full" />
                                                            <span>CATS: {maleWinner.categories}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    )}

                                    {/* Female Winner */}
                                    {femaleWinner && (
                                        <div className="group relative">
                                            <div className="absolute -inset-1 bg-gradient-to-b from-pink-500/30 to-pink-600/5 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                                            <Card className="relative border-0 bg-card/60 overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 z-20">
                                                    <Medal className="h-8 w-8 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                                                </div>
                                                <div className="aspect-[4/5] relative">
                                                    {femaleWinner.user.avatarUrl ? (
                                                        <Image
                                                            src={femaleWinner.user.avatarUrl}
                                                            alt={femaleWinner.user.name}
                                                            fill
                                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full bg-gradient-to-b from-pink-950 to-background flex items-center justify-center">
                                                            <span className="text-9xl font-black text-pink-500/20">{femaleWinner.user.name.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                                        <p className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-1">Women's Champion</p>
                                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-2">{femaleWinner.user.name}</h3>
                                                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                                                            <span>SCORE: {femaleWinner.sum}</span>
                                                            <span className="w-1 h-1 bg-pink-500 rounded-full" />
                                                            <span>CATS: {femaleWinner.categories}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border border-white/5 bg-card/10">
                        <Trophy className="h-24 w-24 mx-auto text-yellow-500/20 mb-6" />
                        <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">The Hall is Empty</h3>
                        <p className="text-muted-foreground">
                            Legends are being forged. Return after the first hostilities conclude.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
