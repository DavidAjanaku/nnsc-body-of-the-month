"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginUser } from "@/app/actions/auth";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

const initialState = {
    message: "",
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending} isLoading={pending}>
            Login
        </Button>
    );
}

export function LoginForm() {
    const [state, formAction] = useActionState(loginUser, initialState);

    return (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-center">Welcome Back, Champion</CardTitle>
                <p className="text-center text-sm text-muted-foreground">
                    Login to continue your fitness journey
                </p>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {state?.message && (
                        <div className="rounded-md bg-red-500/10 border border-red-500/50 p-3">
                            <p className="text-red-500 text-sm text-center">{state.message}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <SubmitButton />

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <Link
                                href="/auth/register"
                                className="text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
