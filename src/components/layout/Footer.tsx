import Link from "next/link";
import { Dumbbell, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Dumbbell className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold uppercase tracking-tighter">
                                NNSC <span className="text-primary">Body</span>
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            "Easy will no longer suffice" - Transform your fitness journey with NN Sports Complex.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/competitions" className="text-muted-foreground hover:text-primary transition-colors">
                                    Competitions
                                </Link>
                            </li>
                            <li>
                                <Link href="/workouts" className="text-muted-foreground hover:text-primary transition-colors">
                                    Workouts
                                </Link>
                            </li>
                            <li>
                                <Link href="/hall-of-fame" className="text-muted-foreground hover:text-primary transition-colors">
                                    Hall of Fame
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="font-semibold mb-4">Account</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/register" className="text-muted-foreground hover:text-primary transition-colors">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/measurements" className="text-muted-foreground hover:text-primary transition-colors">
                                    Track Progress
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>NN Sports Complex</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>+234 XXX XXX XXXX</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>info@nnsc.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} NN Sports Complex. All rights reserved.</p>
                    <p className="mt-2">
                        Body of the Month - Transforming fitness journeys, one month at a time.
                    </p>
                </div>
            </div>
        </footer>
    );
}
