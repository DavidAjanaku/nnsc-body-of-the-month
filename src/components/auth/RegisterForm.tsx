"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { registerUser } from "@/app/actions/auth";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ImageUpload } from "@/components/ui/ImageUpload";

const initialState = {
    message: "",
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending} isLoading={pending}>
            Complete Registration
        </Button>
    );
}

export function RegisterForm() {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [state, formAction] = useActionState(registerUser, initialState);

    return (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Member Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary uppercase tracking-wide border-b border-white/10 pb-2">
                            Personal Information
                        </h3>

                        <ImageUpload
                            value={avatarUrl}
                            onChange={setAvatarUrl}
                            label="Profile Photo"
                            description="Upload a full body portrait (preferably). Max 5MB."
                        />
                        <input type="hidden" name="avatarUrl" value={avatarUrl} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender (for competition category)</Label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Fitness Profile */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary uppercase tracking-wide border-b border-white/10 pb-2">
                            Fitness Profile
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="trainingDuration">Training Duration</Label>
                                <Input id="trainingDuration" name="trainingDuration" placeholder="e.g. 2 years, or 6 months" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="goals">Fitness Goals</Label>
                                <Input id="goals" name="goals" placeholder="e.g. Build muscle, Lose weight" />
                            </div>
                        </div>
                    </div>

                    {/* Measurements */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary uppercase tracking-wide border-b border-white/10 pb-2">
                            Current Measurements
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentWeight">Weight (kg)</Label>
                                <Input id="currentWeight" name="currentWeight" type="number" step="0.1" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chest">Chest (cm)</Label>
                                <Input id="chest" name="chest" type="number" step="0.1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="arms">Arms (cm)</Label>
                                <Input id="arms" name="arms" type="number" step="0.1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="waist">Waist/Belly (cm)</Label>
                                <Input id="waist" name="waist" type="number" step="0.1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="thighs">Thighs (cm)</Label>
                                <Input id="thighs" name="thighs" type="number" step="0.1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="glutes">Glutes (cm)</Label>
                                <Input id="glutes" name="glutes" type="number" step="0.1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="neck">Neck (cm)</Label>
                                <Input id="neck" name="neck" type="number" step="0.1" />
                            </div>
                        </div>
                    </div>

                    {state?.message && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )}

                    <div className="pt-4">
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
