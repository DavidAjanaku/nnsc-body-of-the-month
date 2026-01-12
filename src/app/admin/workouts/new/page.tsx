import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { WorkoutForm } from "@/components/admin/WorkoutForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NewWorkoutPage() {
    await requireAdmin();

    return (
        <main className="min-h-screen bg-background pb-12">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-3xl">
                <Link
                    href="/admin/workouts"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Workouts
                </Link>

                <h1 className="text-3xl font-bold uppercase tracking-tighter mb-8">
                    Create New <span className="text-primary">Workout</span>
                </h1>

                <WorkoutForm />
            </div>
        </main>
    );
}
