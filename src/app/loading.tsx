import { Dumbbell } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Dumbbell className="h-16 w-16 text-primary animate-pulse" />
                <p className="text-xl font-semibold text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
}
