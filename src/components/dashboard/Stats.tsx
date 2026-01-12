import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity, Scale, Trophy, TrendingUp } from "lucide-react";

interface StatsProps {
    weight: number;
    workoutsCompleted: number; // mock
    nextCompetition: string; // mock
    rank?: number; // mock
}

export function Stats({ weight, workoutsCompleted, nextCompetition, rank }: StatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-all duration-300 h-32">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero-modern.png" alt="Weight bg" className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Watermark Icon */}
                <Scale className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/10 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none z-0" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Weight</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-black italic tracking-tighter text-foreground drop-shadow-lg">{weight}kg</div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">+0% from last month</p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-secondary/50 transition-all duration-300 h-32">
                <div className="absolute inset-0 z-0">
                    {/* Fallback to hero-modern if action-1 is not generated yet, but try action-1 first if available. 
                         Since I can't check file existence easily in render, I'll use a safe existing one or a gradient fallback in CSS if I could, 
                         but here I'll use hero-modern with a different crop/filter to ensure it works. 
                     */}
                    <img src="/images/hero-modern.png" alt="Workout bg" className="w-full h-full object-cover opacity-20 mix-blend-overlay hue-rotate-90 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Watermark Icon */}
                <Activity className="absolute -bottom-4 -right-4 h-24 w-24 text-secondary/10 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none z-0" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Workouts</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-black italic tracking-tighter text-foreground drop-shadow-lg">{workoutsCompleted}</div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Keep pushing!</p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 h-32">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero-modern.png" alt="Competition bg" className="w-full h-full object-cover opacity-20 mix-blend-overlay sepia group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Watermark Icon */}
                <Trophy className="absolute -bottom-4 -right-4 h-24 w-24 text-yellow-500/10 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none z-0" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Competition</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-black italic tracking-tighter text-foreground drop-shadow-lg">{nextCompetition}</div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">In 12 days</p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-green-500/50 transition-all duration-300 h-32">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero-modern.png" alt="Rank bg" className="w-full h-full object-cover opacity-20 mix-blend-overlay hue-rotate-180 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Watermark Icon */}
                <TrendingUp className="absolute -bottom-4 -right-4 h-24 w-24 text-green-500/10 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none z-0" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Global Rank</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-black italic tracking-tighter text-foreground drop-shadow-lg">#{rank || "N/A"}</div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Top 10%</p>
                </CardContent>
            </Card>
        </div>
    );
}
