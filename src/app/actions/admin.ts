"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// Competition Management
const CompetitionSchema = z.object({
    name: z.string().min(3, "Competition name is required"),
    date: z.string(), // Date in YYYY-MM-DD format
    maleCategories: z.string().optional(),
    femaleCategories: z.string().optional(),
});

export async function createCompetition(prevState: any, formData: FormData) {
    await requireAdmin();

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = CompetitionSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { name, date, maleCategories, femaleCategories } = validatedFields.data;

    try {
        await prisma.competition.create({
            data: {
                name,
                date: new Date(date),
                status: "UPCOMING",
            },
        });
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to create competition.",
        };
    }

    redirect("/admin/competitions");
}

export async function updateCompetitionStatus(competitionId: string, status: string) {
    await requireAdmin();

    try {
        await prisma.competition.update({
            where: { id: competitionId },
            data: { status },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to update status" };
    }
}

export async function deleteCompetition(competitionId: string) {
    await requireAdmin();

    try {
        await prisma.competition.delete({
            where: { id: competitionId },
        });

        // Revalidate path handled by redirect in client component or parent
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to delete competition" };
    }
}

// Score Entry
export async function enterScore(
    competitionId: string,
    userId: string,
    category: string,
    score: number
) {
    await requireAdmin();

    try {
        // Check if entry exists
        const existing = await prisma.competitionEntry.findFirst({
            where: {
                competitionId,
                userId,
                category,
            },
        });

        if (existing) {
            // Update
            await prisma.competitionEntry.update({
                where: { id: existing.id },
                data: { score },
            });
        } else {
            // Create
            await prisma.competitionEntry.create({
                data: {
                    competitionId,
                    userId,
                    category,
                    score,
                },
            });
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to enter score" };
    }
}

// Calculate Rankings
export async function calculateRankings(competitionId: string) {
    await requireAdmin();

    try {
        const entries = await prisma.competitionEntry.findMany({
            where: { competitionId },
            orderBy: { score: "desc" },
        });

        // Group by category
        const categories = [...new Set(entries.map((e: { category: string }) => e.category))];

        for (const category of categories) {
            const categoryEntries = entries.filter((e: { category: string }) => e.category === category);

            // Assign ranks
            categoryEntries.forEach((entry: { rank?: number | null }, index: number) => {
                entry.rank = index + 1;
            });

            // Update in database
            for (const entry of categoryEntries) {
                await prisma.competitionEntry.update({
                    where: { id: entry.id },
                    data: { rank: entry.rank },
                });
            }
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to calculate rankings" };
    }
}

// Member Management
export async function updateMemberRole(userId: string, role: string) {
    await requireAdmin();

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to update role" };
    }
}

export async function deleteMember(userId: string) {
    await requireAdmin();

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to delete member" };
    }
}

// Workout Management
const WorkoutSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    bodyPart: z.string(),
    difficulty: z.string(),
    content: z.string().min(20),
    imageUrl: z.string().optional(),
});

export async function createWorkout(prevState: any, formData: FormData) {
    await requireAdmin();

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = WorkoutSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { title, description, bodyPart, difficulty, content, imageUrl } = validatedFields.data;

    try {
        await prisma.workout.create({
            data: {
                title,
                description,
                bodyPart,
                difficulty,
                content,
                imageUrl: imageUrl || null,
            },
        });
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to create workout.",
        };
    }

    redirect("/admin/workouts");
}

export async function deleteWorkout(formData: FormData) {
    "use server";
    await requireAdmin();

    const workoutId = formData.get("workoutId") as string;

    try {
        await prisma.workout.delete({
            where: { id: workoutId },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete workout");
    }

    redirect("/admin/workouts");
}
