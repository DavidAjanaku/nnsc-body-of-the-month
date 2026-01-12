import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    return user;
}

export async function requireAuth() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/login");
    }

    return user;
}

export async function requireAdmin() {
    const user = await requireAuth();

    if (user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return user;
}

export function isAdmin(user: any) {
    return user && user.role === "ADMIN";
}
