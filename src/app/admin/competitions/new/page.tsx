import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CompetitionForm } from "@/components/admin/CompetitionForm";

export default async function NewCompetitionPage() {
    await requireAdmin();

    return (
        <main className="min-h-screen bg-background pb-20">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-3xl">
                <Link
                    href="/admin/competitions"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Competitions
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                        Create <span className="text-primary">Competition</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Set up a new monthly competition
                    </p>
                </div>

                <CompetitionForm />
            </div>
        </main>
    );
}
