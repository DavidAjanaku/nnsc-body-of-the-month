import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { Navbar } from "./Navbar";

async function getUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true },
    });

    return user;
}

export async function NavbarWrapper() {
    const user = await getUser();

    return <Navbar user={user} />;
}
