import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { AddMeasurementForm } from "@/components/dashboard/AddMeasurementForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewMeasurementPage() {
    // Check if user is logged in
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/auth/login");
    }

    return (
        <main className="min-h-screen bg-background pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-32 max-w-4xl relative z-10">
                <div className="mb-12">
                    <Link
                        href="/dashboard/measurements"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to History
                    </Link>

                    <h1 className="text-5xl font-black uppercase tracking-tighter italic text-foreground leading-none mb-3">
                        Log <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Progress</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-lg">
                        Update your metrics. Every millimeter is a step toward your ultimate form.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-xl opacity-50" />
                    <AddMeasurementForm />
                </div>
            </div>
        </main>
    );
}
