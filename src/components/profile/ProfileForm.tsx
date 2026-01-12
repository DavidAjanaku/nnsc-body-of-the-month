"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { updateProfile } from "@/app/actions/profile";

interface ProfileFormProps {
    user: {
        id: string;
        name: string;
        email: string;
        gender: string | null;
        goals: string | null;
        trainingDuration: string | null;
        currentWeight: number | null;
        avatarUrl: string | null;
    };
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} isLoading={pending}>
            {pending ? "Saving..." : "Save Changes"}
        </Button>
    );
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [state, formAction] = useActionState(updateProfile, { message: "" });
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <ImageUpload
                            onUploadComplete={(url) => setAvatarUrl(url)}
                            defaultImage={user.avatarUrl || undefined}
                        />
                        <input type="hidden" name="avatarUrl" value={avatarUrl} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={user.name}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user.email}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <select
                                id="gender"
                                name="gender"
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                                defaultValue={user.gender || ""}
                            >
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                            <Input
                                id="currentWeight"
                                name="currentWeight"
                                type="number"
                                step="0.1"
                                defaultValue={user.currentWeight || ""}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="trainingDuration">Training Duration</Label>
                            <Input
                                id="trainingDuration"
                                name="trainingDuration"
                                type="text"
                                placeholder="e.g., 2 years"
                                defaultValue={user.trainingDuration || ""}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="goals">Fitness Goals</Label>
                        <textarea
                            id="goals"
                            name="goals"
                            rows={3}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="What are your fitness goals?"
                            defaultValue={user.goals || ""}
                        />
                    </div>

                    {state?.message && (
                        <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>
                            {state.message}
                        </p>
                    )}

                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
