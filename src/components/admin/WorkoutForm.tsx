"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useState } from "react";
import { createWorkout } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ImageUpload } from "@/components/ui/ImageUpload";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Creating Workout..." : "Create Workout"}
        </Button>
    );
}

export function WorkoutForm() {
    const [state, formAction] = useActionState(createWorkout, { message: "" });
    const [imageUrl, setImageUrl] = useState("");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Workout</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Workout Title</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g., Chest and Triceps Blast"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Brief description of the workout"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bodyPart">Body Part</Label>
                            <select
                                id="bodyPart"
                                name="bodyPart"
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            >
                                <option value="">Select body part</option>
                                <option value="Chest">Chest</option>
                                <option value="Back">Back</option>
                                <option value="Legs">Legs</option>
                                <option value="Shoulders">Shoulders</option>
                                <option value="Arms">Arms</option>
                                <option value="Core">Core</option>
                                <option value="Full Body">Full Body</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty Level</Label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            >
                                <option value="">Select difficulty</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Workout Content</Label>
                        <textarea
                            id="content"
                            name="content"
                            rows={10}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Enter the workout routine details (exercises, sets, reps)&#10;&#10;Example:&#10;1. Bench Press - 4 sets x 8-10 reps&#10;2. Incline Dumbbell Press - 3 sets x 10-12 reps&#10;..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Workout Image (Optional)</Label>
                        <ImageUpload
                            onUploadComplete={(url) => setImageUrl(url)}
                        />
                        <input type="hidden" name="imageUrl" value={imageUrl} />
                    </div>

                    {state?.message && (
                        <p className={`text-sm ${state.message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                            {state.message}
                        </p>
                    )}

                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
