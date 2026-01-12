"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import bcrypt from "bcryptjs";

const ProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    gender: z.string().optional(),
    goals: z.string().optional(),
    trainingDuration: z.string().optional(),
    currentWeight: z.coerce.number().optional(),
    avatarUrl: z.string().optional(),
});

export async function updateProfile(prevState: any, formData: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/login");
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = ProfileSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { name, email, gender, goals, trainingDuration, currentWeight, avatarUrl } = validatedFields.data;

    try {
        // Check if email is being changed and if it's already in use
        if (email !== user.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return {
                    message: "This email is already in use.",
                };
            }
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email,
                gender: gender || null,
                goals: goals || null,
                trainingDuration: trainingDuration || null,
                currentWeight: currentWeight || null,
                avatarUrl: avatarUrl || user.avatarUrl,
            },
        });

        return {
            message: "Profile updated successfully!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to update profile.",
        };
    }
}

const PasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function updatePassword(prevState: any, formData: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/login");
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = PasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { currentPassword, newPassword } = validatedFields.data;

    try {
        // Get user with password
        const userWithPassword = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (!userWithPassword) {
            return {
                message: "User not found.",
            };
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, userWithPassword.password);

        if (!isPasswordValid) {
            return {
                message: "Current password is incorrect.",
            };
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        });

        return {
            message: "Password updated successfully!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to update password.",
        };
    }
}
