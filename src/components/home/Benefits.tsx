import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, Users, Trophy, Activity, Dumbbell, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
    {
        title: "Track Your Progress",
        description: "Visualize your transformation with detailed analytics on weight, measuring, and strength gains.",
        icon: TrendingUp,
        className: "md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-card/50 to-card border-l-4 border-l-primary",
        image: "/images/hero-modern.png"
    },
    {
        title: "Join the Community",
        description: "Connect with like-minded fitness enthusiasts, share tips, and motivate each other.",
        icon: Users,
        className: "md:col-span-1 bg-card/30",
    },
    {
        title: "Compete & Win",
        description: "Monthly showdowns in Squats, Bench Press, and more. Prove you are the Body of the Month.",
        icon: Trophy,
        className: "md:col-span-1 bg-primary/10 border-primary/20",
    },
    {
        title: "Expert Routines",
        description: "Access daily workout plans curated by NN Sports Complex experts to maximize your results.",
        icon: Activity,
        className: "md:col-span-2 bg-card/30",
        image: "/images/action-1.png"
    },
    {
        title: "Beast Mode",
        description: "Unlock your full potential with advanced tracking.",
        icon: Zap,
        className: "md:col-span-1 bg-secondary/10 border-secondary/20",
    },
    {
        title: "Equipment Guide",
        description: "Learn how to use every machine effectively.",
        icon: Dumbbell,
        className: "md:col-span-1 bg-card/30",
    },
];

export function Benefits() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-foreground sm:text-5xl md:text-7xl mb-6">
                        Why Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Elite?</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                        It's more than just a gym. It's a proving ground. Here is what you get when you commit.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {benefits.map((benefit, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 border-white/5",
                                benefit.className
                            )}
                        >
                            {benefit.image && (
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                            <CardHeader className="relative z-20 h-full flex flex-col justify-between">
                                <benefit.icon className="h-12 w-12 text-primary mb-4 group-hover:text-white transition-colors duration-300" />
                                <div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-wide mb-2 group-hover:text-primary transition-colors">
                                        {benefit.title}
                                    </CardTitle>
                                    <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors">
                                        {benefit.description}
                                    </p>
                                </div>
                            </CardHeader>
                            {/* Decorative background element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 z-0" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
