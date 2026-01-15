"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

// const prisma = new PrismaClient(); // Removed

const UserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    gender: z.string(),
    avatarUrl: z.string().optional(),
    goals: z.string().optional(),
    trainingDuration: z.string().optional(),
    currentWeight: z.coerce.number(), // Ensure number
    // Measurements
    chest: z.coerce.number().optional(),
    arms: z.coerce.number().optional(),
    waist: z.coerce.number().optional(),
    thighs: z.coerce.number().optional(),
    neck: z.coerce.number().optional(),
    glutes: z.coerce.number().optional(),
});

export async function registerUser(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    // Basic validation
    const validatedFields = UserSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    const { name, email, password, gender, avatarUrl, goals, trainingDuration, currentWeight, chest, arms, waist, thighs, neck, glutes } = validatedFields.data;

    try {
        // Check existing user
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                message: "User already exists with this email.",
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User and Initial Measurement
        const newUser = await prisma.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    gender,
                    avatarUrl: avatarUrl || null,
                    goals,
                    trainingDuration,
                    currentWeight,
                },
            });

            await tx.measurement.create({
                data: {
                    userId: user.id,
                    weight: currentWeight,
                    chest,
                    arms,
                    waist,
                    thighs,
                    neck,
                    glutes,
                },
            });

            return user;
        });

        if (newUser) {
            (await cookies()).set("userId", newUser.id);
        }

    } catch (error) {
        console.error(error);
        return {
            message: "Database error: Failed to create user.",
        };
    }

    redirect("/dashboard");
}

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

export async function loginUser(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    // Validate input
    const validatedFields = LoginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please check your credentials.",
        };
    }

    const { email, password } = validatedFields.data;

    let redirectPath = "/dashboard";
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return {
                message: "Invalid email or password.",
            };
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                message: "Invalid email or password.",
            };
        }

        // Set session cookie
        (await cookies()).set("userId", user.id);

        // Redirect based on role
        if (user.role === "ADMIN") {
            redirectPath = "/admin";
        } else {
            redirectPath = "/dashboard";
        }

    } catch (error) {
        // If it's a redirect error, let it bubble up
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            throw error;
        }
        console.error(error);
        return {
            message: "An error occurred during login.",
        };
    }

    redirect(redirectPath);
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("userId");
    redirect("/");
}
