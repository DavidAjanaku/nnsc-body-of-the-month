import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <Dumbbell className="h-20 w-20 text-primary" />
                </div>
                <div>
                    <h1 className="text-6xl font-bold mb-2">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button variant="primary">
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/competitions">
                        <Button variant="outline">
                            View Competitions
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
