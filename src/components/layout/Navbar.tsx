"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserMenu } from "./UserMenu";

interface NavbarProps {
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    } | null;
}

export function Navbar({ user }: NavbarProps = {}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-2">
                    <Dumbbell className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold uppercase tracking-tighter text-foreground">
                        NNSC <span className="text-primary">Body</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/competitions" className="text-sm font-medium hover:text-primary transition-colors">
                        Competitions
                    </Link>
                    <Link href="/workouts" className="text-sm font-medium hover:text-primary transition-colors">
                        Workouts
                    </Link>
                    <Link href="/hall-of-fame" className="text-sm font-medium hover:text-primary transition-colors">
                        Winners
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <UserMenu userName={user.name} userRole={user.role} />
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button variant="primary" size="sm">
                                    Join Now
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden border-b border-white/10 bg-background px-4 py-4"
                    >
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/competitions"
                                className="text-sm font-medium hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Competitions
                            </Link>
                            <Link
                                href="/workouts"
                                className="text-sm font-medium hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Workouts
                            </Link>
                            <Link
                                href="/hall-of-fame"
                                className="text-sm font-medium hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Winners
                            </Link>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                                {user ? (
                                    <>
                                        {user.role === "ADMIN" && (
                                            <Link href="/admin" onClick={() => setIsOpen(false)}>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    Admin Panel
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                Settings
                                            </Button>
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                const { logoutUser } = await import("@/app/actions/auth");
                                                await logoutUser();
                                            }}
                                            className="flex w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium text-red-500 hover:bg-accent transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                                            <Button variant="primary" className="w-full">
                                                Join Now
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
