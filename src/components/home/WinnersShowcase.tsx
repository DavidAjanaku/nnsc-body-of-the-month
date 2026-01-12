"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { differenceInSeconds, nextSaturday, setDate, startOfMonth, addMonths, isSaturday, isFirstDayOfMonth } from "date-fns";

export function WinnersShowcase() {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Logic to find next 1st Saturday of the month
    // Simplification: Find next month start, then find first Saturday? 
    // Or if we are before the 1st Saturday of current month, use that?
    // User spec: "1st Saturday of each month".

    useEffect(() => {
        const calculateTimeLeft = () => {
            // This is a simplified countdown to a mock date for demo purposes
            // Ideally calculate exact next first saturday. 
            // For demo: Let's target Feb 7th, 2026 (Mock date) or better, algorithmically.

            const now = new Date();
            let targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Start of next month

            // Find first Saturday of next month
            while (targetDate.getDay() !== 6) {
                targetDate.setDate(targetDate.getDate() + 1);
            }
            // Set time to 9 AM
            targetDate.setHours(9, 0, 0, 0);

            const diff = differenceInSeconds(targetDate, now);

            if (diff > 0) {
                const days = Math.floor(diff / (3600 * 24));
                const hours = Math.floor((diff % (3600 * 24)) / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = Math.floor(diff % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Init

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden bg-accent/20">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-accent/5 to-background z-0" />

            <div className="container px-4 mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-5xl mb-12">
                    Current Body of the <span className="text-secondary">Month</span>
                </h2>

                {/* Winners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-20">
                    {/* Male Winner */}
                    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                        {/* Image */}
                        <div className="absolute inset-0">
                            <img
                                src="/images/male-winner.png"
                                alt="Male Winner"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-left">
                            <p className="text-secondary font-bold tracking-widest text-sm mb-1">MENS CATEGORY</p>
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">John Doe</h3>
                            <p className="text-white/90 font-medium">Squat King - Jan 2026</p>
                        </div>
                    </div>

                    {/* Female Winner */}
                    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                        {/* Image */}
                        <div className="absolute inset-0">
                            <img
                                src="/images/female-winner.png"
                                alt="Female Winner"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-left">
                            <p className="text-primary font-bold tracking-widest text-sm mb-1">WOMENS CATEGORY</p>
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Jane Smith</h3>
                            <p className="text-white/90 font-medium">Deadlift Queen - Jan 2026</p>
                        </div>
                    </div>
                </div>

                {/* Countdown */}
                <div className="bg-card border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
                    <h4 className="text-xl font-medium text-muted-foreground uppercase tracking-widest mb-6">
                        Next Competition Starts In
                    </h4>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <span className="block text-4xl md:text-6xl font-black text-foreground">{timeLeft.days}</span>
                            <span className="text-xs md:text-sm text-muted-foreground uppercase">Days</span>
                        </div>
                        <div>
                            <span className="block text-4xl md:text-6xl font-black text-foreground">{timeLeft.hours}</span>
                            <span className="text-xs md:text-sm text-muted-foreground uppercase">Hours</span>
                        </div>
                        <div>
                            <span className="block text-4xl md:text-6xl font-black text-foreground">{timeLeft.minutes}</span>
                            <span className="text-xs md:text-sm text-muted-foreground uppercase">Minutes</span>
                        </div>
                        <div>
                            <span className="block text-4xl md:text-6xl font-black text-secondary">{timeLeft.seconds}</span>
                            <span className="text-xs md:text-sm text-muted-foreground uppercase">Seconds</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Link href="/competitions">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider">
                                View Upcoming Competitions
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
