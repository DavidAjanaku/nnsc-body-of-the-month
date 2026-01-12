import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getUpcomingCompetitions } from "@/app/actions/competitions";
import { format } from "date-fns";
import Link from "next/link";
import { Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function CompetitionsPage() {
    const competitions = await getUpcomingCompetitions();
    const upcomingCompetition = competitions[0];

    return (
        <main className="min-h-screen bg-background pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />

            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 relative z-10">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter text-foreground sm:text-7xl mb-4 drop-shadow-2xl">
                        Monthly <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clash</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Prove your strength. Claim the glory.
                    </p>
                </div>

                {upcomingCompetition ? (
                    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
                        <Card className="border-secondary/20 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardHeader className="relative z-10">
                                <CardTitle className="uppercase tracking-widest text-secondary flex items-center gap-2 text-sm font-bold">
                                    <Calendar className="h-4 w-4" />
                                    Next Event: {format(new Date(upcomingCompetition.date), "MMM d, yyyy")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <h3 className="text-4xl font-black uppercase italic tracking-tight mb-4">{upcomingCompetition.name}</h3>
                                <div className="mb-8">
                                    <p className="text-lg text-muted-foreground mb-2 flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <strong>{([...new Set(upcomingCompetition.entries.map((e: any) => e.userId))].length)}</strong> Warriors Registered
                                    </p>
                                </div>
                                <Link href={`/competitions/${upcomingCompetition.id}`}>
                                    <Button className="w-full text-lg h-14 uppercase font-bold tracking-widest bg-primary hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--color-primary)]">
                                        Join the Fight
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/30 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="uppercase tracking-widest flex items-center gap-3 text-lg">
                                    <Trophy className="h-6 w-6 text-yellow-500" />
                                    Rules of Engagement
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <p className="text-muted-foreground leading-relaxed">
                                        Points are awarded based on rank in each category. The participant with the
                                        best overall performance wins Body of the Month.
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold text-primary uppercase text-sm mb-2 tracking-wide">Men's Division</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["Squats", "Bench Press", "Curls", "Push-ups"].map((item) => (
                                                    <span key={item} className="px-3 py-1 rounded bg-white/5 text-sm border border-white/10">{item}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-pink-500 uppercase text-sm mb-2 tracking-wide">Women's Division</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["Squats", "Deadlifts", "Abdominals", "Cable Extensions"].map((item) => (
                                                    <span key={item} className="px-3 py-1 rounded bg-white/5 text-sm border border-white/10">{item}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Card className="mt-8 bg-card/30 border-white/5">
                        <CardContent className="py-24 text-center">
                            <Trophy className="h-24 w-24 mx-auto text-muted-foreground/20 mb-6" />
                            <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">No Active Conflicts</h3>
                            <p className="text-muted-foreground">
                                Prepare yourself. The next battle will be announced soon.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Past Competitions */}
                {competitions.length > 1 && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold uppercase tracking-tight mb-8 pl-4 border-l-4 border-primary">Legacy Events</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {competitions.map((competition: any) => (
                                <Card key={competition.id} className="group bg-card/30 hover:bg-card/50 border-white/5 hover:border-primary/30 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold uppercase italic tracking-tighter group-hover:text-primary transition-colors">{competition.name}</CardTitle>
                                        <p className="text-sm font-mono text-muted-foreground">
                                            {format(new Date(competition.date), "MMMM d, yyyy")}
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center rounded px-2 py-1 text-xs font-bold uppercase tracking-wider",
                                                    competition.status === "UPCOMING" ? "bg-blue-500/10 text-blue-500" :
                                                        competition.status === "ACTIVE" ? "bg-green-500/10 text-green-500" :
                                                            "bg-white/5 text-muted-foreground"
                                                )}
                                            >
                                                {competition.status}
                                            </span>
                                            <Link href={`/competitions/${competition.id}`}>
                                                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                                                    View Details -{">"}
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
