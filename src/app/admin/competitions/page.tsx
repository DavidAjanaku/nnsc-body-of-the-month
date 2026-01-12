import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { deleteCompetition } from "@/app/actions/admin";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';


async function getAllCompetitions() {
    const competitions = await prisma.competition.findMany({
        orderBy: { date: "desc" },
        include: {
            entries: {
                include: {
                    user: true,
                },
            },
        },
    });

    return competitions;
}

export default async function CompetitionsPage() {
    await requireAdmin();
    const competitions = await getAllCompetitions();

    return (
        <main className="min-h-screen bg-background pb-20">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/admin"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Admin Dashboard
                    </Link>
                    <Link href="/admin/competitions/new">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            New Competition
                        </Button>
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                        Competition <span className="text-primary">Management</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Total Competitions: {competitions.length}
                    </p>
                </div>

                <div className="space-y-4">
                    {competitions.map((competition) => (
                        <Card key={competition.id} className="hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{competition.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {format(new Date(competition.date), "EEEE, MMMM d, yyyy")}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${competition.status === "UPCOMING"
                                                ? "bg-blue-500/20 text-blue-500"
                                                : competition.status === "ACTIVE"
                                                    ? "bg-green-500/20 text-green-500"
                                                    : "bg-gray-500/20 text-gray-500"
                                                }`}
                                        >
                                            {competition.status}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="text-muted-foreground">Participants: </span>
                                        <span className="font-semibold">
                                            {[...new Set(competition.entries.map((e) => e.userId))].length}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/competitions/${competition.id}`}>
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        </Link>
                                        <form
                                            action={async () => {
                                                "use server";
                                                await deleteCompetition(competition.id);
                                                redirect("/admin/competitions");
                                            }}
                                        >
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {competitions.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-4">No competitions created yet.</p>
                            <Link href="/admin/competitions/new">
                                <Button>Create First Competition</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main >
    );
}
