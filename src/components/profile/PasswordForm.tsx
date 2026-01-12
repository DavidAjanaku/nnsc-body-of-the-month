"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { updatePassword } from "@/app/actions/profile";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} isLoading={pending}>
            {pending ? "Updating..." : "Update Password"}
        </Button>
    );
}

export function PasswordForm() {
    const [state, formAction] = useActionState(updatePassword, { message: "" });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password *</Label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password *</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Must be at least 6 characters long
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
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
