"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function registerForCompetition(competitionId: string, categories: string[]) {
    const user = await requireAuth();

    try {
        // Check if already registered
        const existing = await prisma.competitionEntry.findFirst({
            where: {
                competitionId,
                userId: user.id,
            },
        });

        if (existing) {
            return {
                success: false,
                message: "You are already registered for this competition.",
            };
        }

        // Register for each category
        for (const category of categories) {
            await prisma.competitionEntry.create({
                data: {
                    competitionId,
                    userId: user.id,
                    category,
                    score: 0,
                },
            });
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to register for competition.",
        };
    }
}

export async function getCompetitionLeaderboard(competitionId: string) {
    const entries = await prisma.competitionEntry.findMany({
        where: { competitionId },
        include: {
            user: true,
        },
        orderBy: [
            { category: "asc" },
            { score: "desc" },
        ],
    });

    return entries;
}

export async function getUpcomingCompetitions() {
    const competitions = await prisma.competition.findMany({
        where: {
            status: {
                in: ["UPCOMING", "ACTIVE"],
            },
        },
        orderBy: { date: "asc" },
        include: {
            entries: true,
        },
    });

    return competitions;
}
