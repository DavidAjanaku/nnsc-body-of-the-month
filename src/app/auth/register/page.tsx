import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-background pb-20">
            <NavbarWrapper />
            <div className="container mx-auto px-4 pt-24 max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                        Join the <span className="text-primary">Clash</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Complete your profile to start tracking and competing.
                    </p>
                </div>

                <RegisterForm />
            </div>
        </main>
    );
}
