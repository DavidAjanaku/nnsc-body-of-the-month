import { requireAdmin } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

export const dynamic = 'force-dynamic';

async function getAllMembers() {
    const members = await prisma.user.findMany({
        orderBy: { joinDate: "desc" },
        include: {
            measurements: {
                orderBy: { date: "desc" },
                take: 1,
            },
        },
    });

    return members;
}

export default async function MembersPage() {
    await requireAdmin();
    const members = await getAllMembers();

    return (
        <main className="min-h-screen bg-background pb-20">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-7xl">
                <Link
                    href="/admin"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Admin Dashboard
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                        Member <span className="text-primary">Management</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Total Members: {members.length}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member) => {
                        const latestMeasurement = member.measurements[0];

                        return (
                            <Card key={member.id} className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {member.avatarUrl ? (
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={member.avatarUrl}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl font-bold text-primary">
                                                    {member.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate">{member.name}</h3>
                                            <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${member.role === 'ADMIN' ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'}`}>
                                                    {member.role}
                                                </span>
                                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-muted text-muted-foreground">
                                                    {member.gender || 'N/A'}
                                                </span>
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <p className="text-muted-foreground">Weight</p>
                                                    <p className="font-semibold">{member.currentWeight || '-'}kg</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Joined</p>
                                                    <p className="font-semibold">
                                                        {format(new Date(member.joinDate), "MMM yyyy")}
                                                    </p>
                                                </div>
                                            </div>

                                            {latestMeasurement && (
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    Last updated: {format(new Date(latestMeasurement.date), "MMM d, yyyy")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {members.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">No members yet.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
