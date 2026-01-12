"use client";

import { motion } from "framer-motion";

const images = [
    "/images/action-1.png",
    "/images/male-winner.png",
    "/images/female-winner.png",
    "/images/hero-modern.png",
    "/images/action-1.png",
    "/images/male-winner.png",
];

export function CommunityGallery() {
    return (
        <section className="py-20 bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

            <div className="container mx-auto px-4 mb-12 relative z-20">
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
                    Hall of <span className="text-primary">Action</span>
                </h2>
                <p className="text-muted-foreground mt-4 text-xl">Real people. Real results.</p>
            </div>

            <div className="flex gap-6 overflow-hidden select-none -skew-y-3">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-6 min-w-full"
                >
                    {[...images, ...images].map((src, index) => (
                        <div
                            key={index}
                            className="relative w-[300px] h-[400px] shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-105 border border-white/10"
                        >
                            <div className="absolute inset-0 bg-primary/20 opacity-0 hover:opacity-100 transition-opacity z-10" />
                            <img
                                src={src}
                                alt={`Gallery image ${index}`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-6 min-w-full"
                >
                    {[...images, ...images].map((src, index) => (
                        <div
                            key={index}
                            className="relative w-[300px] h-[400px] shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-105 border border-white/10"
                        >
                            <div className="absolute inset-0 bg-primary/20 opacity-0 hover:opacity-100 transition-opacity z-10" />
                            <img
                                src={src}
                                alt={`Gallery image ${index}`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
