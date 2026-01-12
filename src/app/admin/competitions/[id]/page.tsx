import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Trophy, Users, Trash } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { ScoreEntryForm } from "@/components/admin/ScoreEntryForm";
import { updateCompetitionStatus, calculateRankings, deleteCompetition } from "@/app/actions/admin";
import Image from "next/image";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

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
        return null;
    }

    return competition;
}

async function getAllMembers() {
    const members = await prisma.user.findMany({
        where: {
            role: "MEMBER",
        },
        orderBy: { name: "asc" },
    });
    return members;
}

export default async function AdminCompetitionDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    await requireAdmin();

    const { id } = await params;
    const competition = await getCompetition(id);

    if (!competition) {
        notFound();
    }

    const members = await getAllMembers();

    // Get unique categories
    const categories = [...new Set(competition.entries.map((e: any) => e.category as string))] as string[];

    // Group entries by category
    const leaderboards: Record<string, any[]> = {};
    categories.forEach((category: string) => {
        leaderboards[category] = competition.entries
            .filter((e: any) => e.category === category)
            .sort((a: any, b: any) => b.score - a.score);
    });

    // Calculate overall standings
    const userRankSums: Record<string, { user: any; sum: number; categories: number }> = {};
    competition.entries.forEach((entry: any) => {
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

    const overallStandings = Object.values(userRankSums)
        .filter((u) => u.categories > 0)
        .sort((a, b) => a.sum - b.sum);

    async function handleCalculateRankings() {
        "use server";
        await calculateRankings(id);
    }

    async function handleUpdateStatus(formData: FormData) {
        "use server";
        const status = formData.get("status") as string;
        await updateCompetitionStatus(id, status);
    }

    return (
        <main className="min-h-screen bg-background pb-12">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-7xl">
                <Link
                    href="/admin/competitions"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Competitions
                </Link>

                {/* Competition Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter mb-2">
                        {competition.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{format(new Date(competition.date), "MMMM d, yyyy")}</span>
                        <span className={`px-2 py-1 rounded-full font-semibold ${competition.status === "UPCOMING"
                                ? "bg-blue-500/20 text-blue-500"
                                : competition.status === "ACTIVE"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-gray-500/20 text-gray-500"
                            }`}>
                            {competition.status}
                        </span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">
                                Total Participants
                            </h3>
                            <p className="text-3xl font-bold">
                                {[...new Set(competition.entries.map((e: any) => e.userId))].length}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">
                                Categories
                            </h3>
                            <p className="text-3xl font-bold">{categories.length}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">
                                Total Entries
                            </h3>
                            <p className="text-3xl font-bold">{competition.entries.length}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Actions */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Competition Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <form action={handleCalculateRankings}>
                                <Button type="submit" variant="primary">
                                    <Trophy className="h-4 w-4 mr-2" />
                                    Calculate Rankings
                                </Button>
                            </form>

                            <form action={handleUpdateStatus} className="flex gap-2">
                                <select
                                    name="status"
                                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    defaultValue={competition.status}
                                >
                                    <option value="UPCOMING">Upcoming</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                                <Button type="submit" variant="outline">
                                    Update Status
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                {/* Score Entry Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Enter Scores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScoreEntryForm
                            competitionId={id}
                            members={members}
                        />
                    </CardContent>
                </Card>

                {/* Overall Standings */}
                {overallStandings.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                Overall Standings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rank</th>
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Member</th>
                                            <th className="text-right p-4 text-sm font-medium text-muted-foreground">Rank Sum</th>
                                            <th className="text-right p-4 text-sm font-medium text-muted-foreground">Categories</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {overallStandings.map((standing, index) => (
                                            <tr key={standing.user.id} className="border-b border-border last:border-0">
                                                <td className="p-4">
                                                    <span className="text-lg font-bold">{index + 1}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        {standing.user.avatarUrl ? (
                                                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                                <Image
                                                                    src={standing.user.avatarUrl}
                                                                    alt={standing.user.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                                <span className="font-bold text-primary">
                                                                    {standing.user.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <span className="font-medium">{standing.user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className="text-lg font-semibold">{standing.sum}</span>
                                                </td>
                                                <td className="p-4 text-right text-muted-foreground">
                                                    {standing.categories}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Category Leaderboards */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Category Leaderboards</h2>
                    {categories.length > 0 ? (
                        categories.map((category: string) => (
                            <Card key={category}>
                                <CardHeader>
                                    <CardTitle>{category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-border">
                                                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rank</th>
                                                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Member</th>
                                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leaderboards[category].map((entry: any, index: number) => (
                                                    <tr key={entry.id} className="border-b border-border last:border-0">
                                                        <td className="p-4">
                                                            <span className="text-lg font-bold">
                                                                {entry.rank || index + 1}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                {entry.user.avatarUrl ? (
                                                                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                                        <Image
                                                                            src={entry.user.avatarUrl}
                                                                            alt={entry.user.name}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                                        <span className="font-bold text-primary">
                                                                            {entry.user.name.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <span className="font-medium">{entry.user.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <span className="text-lg font-semibold">{entry.score}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {leaderboards[category].length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="p-8 text-center text-muted-foreground">
                                                            No scores entered yet
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No Entries Yet</h3>
                                <p className="text-muted-foreground">
                                    Start by entering scores for participants.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
