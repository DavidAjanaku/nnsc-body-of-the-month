"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const MeasurementSchema = z.object({
    weight: z.coerce.number().min(1, "Weight is required"),
    chest: z.coerce.number().optional(),
    arms: z.coerce.number().optional(),
    waist: z.coerce.number().optional(),
    thighs: z.coerce.number().optional(),
    neck: z.coerce.number().optional(),
    glutes: z.coerce.number().optional(),
    photoUrl: z.string().optional(),
});

export async function addMeasurement(prevState: any, formData: FormData) {
    // Get current user
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/auth/login");
    }

    const rawData = Object.fromEntries(formData.entries());

    // Validate
    const validatedFields = MeasurementSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { weight, chest, arms, waist, thighs, neck, glutes, photoUrl } = validatedFields.data;

    try {
        // Create new measurement entry
        await prisma.measurement.create({
            data: {
                userId,
                weight,
                chest,
                arms,
                waist,
                thighs,
                neck,
                glutes,
                photoUrl: photoUrl || null,
                date: new Date(),
            },
        });

        // Update user's current weight
        await prisma.user.update({
            where: { id: userId },
            data: { currentWeight: weight },
        });

    } catch (error) {
        console.error(error);
        return {
            message: "Failed to add measurement. Please try again.",
        };
    }

    redirect("/dashboard");
}

export async function getMeasurementHistory(userId: string) {
    const measurements = await prisma.measurement.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
    });

    return measurements;
}
