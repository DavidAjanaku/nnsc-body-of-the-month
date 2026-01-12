"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16">
            {/* Background with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                {/* Dark overlay with gradient */}
                <div className="absolute inset-0 bg-background/60 z-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />

                {/* Hero Image */}
                <img
                    src="/images/hero-modern.png"
                    alt="Gym Background"
                    className="h-full w-full object-cover"
                />
            </motion.div>

            <div className="container relative z-20 flex flex-col items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="mb-6 inline-flex items-center justify-center rounded-full border border-primary/30 bg-black/50 backdrop-blur-md px-6 py-2 text-sm font-bold text-primary uppercase tracking-[0.2em] shadow-[0_0_20px_-5px_var(--color-primary)]">
                        Join the Elite
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-4 text-5xl font-black uppercase italic tracking-tighter text-foreground sm:text-7xl md:text-9xl drop-shadow-2xl"
                >
                    Easy Will <br className="hidden sm:block" />
                    <span className="relative">
                        <span className="absolute -inset-1 blur-2xl bg-primary/20 rounded-full" />
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                            No Longer Suffice
                        </span>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-8 max-w-2xl text-lg text-neutral-300 sm:text-xl font-light tracking-wide leading-relaxed drop-shadow-lg"
                >
                    The NNSC Body of the Month program isn't for the weak. <br className="hidden sm:block" />
                    Push your limits, track your progress, and dominate the leaderboard.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="mt-12 flex flex-col sm:flex-row gap-6"
                >
                    <Link href="/auth/register">
                        <Button size="lg" className="h-16 px-12 text-xl font-bold uppercase tracking-widest shadow-[0_0_40px_-10px_var(--color-primary)] hover:shadow-[0_0_60px_-10px_var(--color-primary)] transition-all hover:scale-105 bg-primary text-white border-0">
                            Start Now
                            <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
                        </Button>
                    </Link>
                    <Link href="/competitions">
                        <Button variant="outline" size="lg" className="h-16 px-12 text-xl font-bold uppercase tracking-widest border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105 text-white">
                            Explore
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
            </motion.div>
        </div>
    );
}
