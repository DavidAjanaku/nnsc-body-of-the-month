import { requireAuth } from "@/lib/auth";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PasswordForm } from "@/components/profile/PasswordForm";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getCurrentUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            gender: true,
            goals: true,
            trainingDuration: true,
            currentWeight: true,
            avatarUrl: true,
            role: true,
        },
    });

    if (!user) {
        redirect("/auth/login");
    }

    return user;
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SettingsPage() {
    await requireAuth();
    const user = await getCurrentUser();

    // Determine back link and text based on role
    const backLink = user.role === "ADMIN" ? "/admin" : "/dashboard";
    const backText = user.role === "ADMIN" ? "Back to Admin Dashboard" : "Back to Dashboard";

    return (
        <main className="min-h-screen bg-background pb-12">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-4xl">
                <Link
                    href={backLink}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {backText}
                </Link>

                <h1 className="text-3xl font-bold uppercase tracking-tighter mb-8">
                    Profile <span className="text-primary">Settings</span>
                </h1>

                <div className="space-y-6">
                    <ProfileForm user={user} />
                    <PasswordForm />
                </div>
            </div>
        </main>
    );
}
