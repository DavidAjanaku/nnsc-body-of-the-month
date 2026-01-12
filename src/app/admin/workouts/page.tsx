import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Dumbbell, ArrowLeft } from "lucide-react";
import { deleteWorkout } from "@/app/actions/admin";
import Image from "next/image";

export const dynamic = 'force-dynamic';

async function getWorkouts() {
    const workouts = await prisma.workout.findMany({
        orderBy: { createdAt: "desc" },
    });
    return workouts;
}

export default async function AdminWorkoutsPage() {
    await requireAdmin();
    const workouts = await getWorkouts();

    return (
        <main className="min-h-screen bg-background pb-12">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-7xl">
                <Link
                    href="/admin"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Admin Dashboard
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter">
                        Manage <span className="text-primary">Workouts</span>
                    </h1>
                    <Link href="/admin/workouts/new">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Workout
                        </Button>
                    </Link>
                </div>

                {workouts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workouts.map((workout: any) => (
                            <Card key={workout.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    {workout.imageUrl ? (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={workout.imageUrl}
                                                alt={workout.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                            <Dumbbell className="h-16 w-16 text-muted-foreground" />
                                        </div>
                                    )}

                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {workout.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                                                {workout.bodyPart}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full font-medium ${workout.difficulty === "Beginner"
                                                    ? "bg-green-500/20 text-green-500"
                                                    : workout.difficulty === "Intermediate"
                                                        ? "bg-yellow-500/20 text-yellow-500"
                                                        : "bg-red-500/20 text-red-500"
                                                }`}>
                                                {workout.difficulty}
                                            </span>
                                        </div>

                                        <form action={deleteWorkout}>
                                            <input type="hidden" name="workoutId" value={workout.id} />
                                            <Button
                                                type="submit"
                                                variant="ghost"
                                                className="w-full text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete Workout
                                            </Button>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Workouts Yet</h3>
                            <p className="text-muted-foreground mb-6">
                                Get started by creating your first workout routine.
                            </p>
                            <Link href="/admin/workouts/new">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create First Workout
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
