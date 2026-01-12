import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background pb-20">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                        Body of the <span className="text-primary">Month</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground italic">
                        Easy will no longer suffice
                    </p>
                </div>

                <LoginForm />
            </div>
        </main>
    );
}
