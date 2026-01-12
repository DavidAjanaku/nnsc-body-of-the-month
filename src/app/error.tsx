"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <AlertTriangle className="h-20 w-20 text-red-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">Something went wrong!</h1>
                    <p className="text-muted-foreground">
                        An error occurred while loading this page.
                    </p>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => reset()} variant="primary">
                        Try Again
                    </Button>
                    <Button onClick={() => window.location.href = "/"} variant="outline">
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
