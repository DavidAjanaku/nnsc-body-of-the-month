"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { registerForCompetition } from "@/app/actions/competitions";
import { UserPlus } from "lucide-react";

interface RegisterButtonProps {
    competitionId: string;
    isRegistered: boolean;
    competitionStatus: string;
}

export function RegisterButton({ competitionId, isRegistered, competitionStatus }: RegisterButtonProps) {
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(isRegistered);
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        setLoading(true);
        setMessage("");

        try {
            const result = await registerForCompetition(competitionId);

            if (result.success) {
                setRegistered(true);
                setMessage("Successfully registered for competition!");
            } else {
                setMessage(result.message || "Failed to register");
            }
        } catch (error) {
            setMessage("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (competitionStatus === "COMPLETED") {
        return null;
    }

    if (registered) {
        return (
            <div className="space-y-2">
                <Button disabled className="w-full sm:w-auto">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Already Registered
                </Button>
                {message && <p className="text-sm text-green-500">{message}</p>}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Button
                onClick={handleRegister}
                disabled={loading}
                isLoading={loading}
                className="w-full sm:w-auto"
            >
                <UserPlus className="h-4 w-4 mr-2" />
                {loading ? "Registering..." : "Register for Competition"}
            </Button>
            {message && (
                <p className={`text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
