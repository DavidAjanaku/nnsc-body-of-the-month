"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createCompetition } from "@/app/actions/admin";

const initialState = {
    message: "",
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending} isLoading={pending}>
            Create Competition
        </Button>
    );
}

export function CompetitionForm() {
    const [state, formAction] = useActionState(createCompetition, initialState);

    return (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Competition Details</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Competition Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. February Body of the Month"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Competition Date *</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Typically the 1st Saturday of the month
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maleCategories">Male Categories</Label>
                            <Input
                                id="maleCategories"
                                name="maleCategories"
                                placeholder="e.g. Squats, Bench Press, Curls, Push-ups"
                            />
                            <p className="text-xs text-muted-foreground">
                                Comma-separated list of competition categories for men
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="femaleCategories">Female Categories</Label>
                            <Input
                                id="femaleCategories"
                                name="femaleCategories"
                                placeholder="e.g. Squats, Deadlifts, Abdominals, Cable Arm Extensions"
                            />
                            <p className="text-xs text-muted-foreground">
                                Comma-separated list of competition categories for women
                            </p>
                        </div>
                    </div>

                    {state?.message && (
                        <div className="rounded-md bg-red-500/10 border border-red-500/50 p-3">
                            <p className="text-red-500 text-sm text-center">{state.message}</p>
                        </div>
                    )}

                    <div className="pt-4">
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
