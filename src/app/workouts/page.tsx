import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import prisma from "@/lib/prisma";
import { Dumbbell, Clock, Activity } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

async function getWorkouts() {
    const workouts = await prisma.workout.findMany({
        orderBy: { createdAt: "desc" },
    });
    return workouts;
}

export const dynamic = 'force-dynamic';

export default async function WorkoutsPage() {
    const workouts = await getWorkouts();

    return (
        <main className="min-h-screen bg-background pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 relative z-10">
                <div className="mb-12">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter sm:text-7xl mb-4">
                        Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Grind</span>
                    </h1>
                    <p className="text-xl text-muted-foreground w-full max-w-2xl">
                        Forge your body with professional routines designed for maximum impact.
                    </p>
                </div>

                {workouts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workouts.map((workout) => (
                            <Card key={workout.id} className="group overflow-hidden bg-card/30 border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                                <CardContent className="p-0">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                        {workout.imageUrl ? (
                                            <Image
                                                src={workout.imageUrl}
                                                alt={workout.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-card to-card/50 flex items-center justify-center">
                                                <Dumbbell className="h-20 w-20 text-white/5" />
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 left-4 right-4 z-20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-primary text-primary-foreground">
                                                    {workout.bodyPart}
                                                </span>
                                                <span className={cn("px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
                                                    workout.difficulty === "Beginner" ? "bg-green-500/20 text-green-500" :
                                                        workout.difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-500" :
                                                            "bg-red-500/20 text-red-500"
                                                )}>
                                                    {workout.difficulty}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black uppercase italic tracking-tight text-white mb-1 group-hover:text-primary transition-colors">{workout.title}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10">
                                            {workout.description}
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/70 uppercase tracking-widest">
                                                <Activity className="h-3 w-3" />
                                                <span>Routine_Preview.log</span>
                                            </div>
                                            <pre className="text-xs text-muted-foreground/80 whitespace-pre-wrap font-mono bg-black/40 p-4 rounded border border-white/5 h-32 overflow-hidden relative">
                                                {workout.content}
                                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
                                            </pre>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center relative overflow-hidden rounded-3xl border border-white/5 bg-card/20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                        <Dumbbell className="h-24 w-24 text-white/5 mb-6" />
                        <h3 className="text-3xl font-black uppercase italic tracking-tight text-muted-foreground">No Routines Deployed</h3>
                        <p className="text-muted-foreground max-w-md mt-2">
                            The training database is currently empty. Protocols will be uploaded shortly.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
