"use client";

import { useState } from "react";
import { User, LogOut, LayoutDashboard, Shield, Settings } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface UserMenuProps {
    userName: string;
    userRole: string;
}

export function UserMenu({ userName, userRole }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 rounded-md border border-primary/20 bg-accent px-3 py-2 text-sm font-medium hover:bg-accent/80 transition-colors"
            >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{userName}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-border bg-card shadow-lg">
                        <div className="p-2">
                            {userRole === "ADMIN" ? (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                                >
                                    <Shield className="h-4 w-4" />
                                    <span>Admin Panel</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                            )}
                            <Link
                                href="/dashboard/settings"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                            >
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors text-red-500"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
