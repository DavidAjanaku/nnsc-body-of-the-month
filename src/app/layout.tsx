import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NNSC Body of the Month - Fitness Community Platform",
  description: "Transform your fitness journey with NN Sports Complex. Track progress, compete monthly, and celebrate victories. Easy will no longer suffice.",
  keywords: ["fitness", "gym", "body transformation", "competition", "workout tracking", "NNSC", "NN Sports Complex"],
  authors: [{ name: "NN Sports Complex" }],
  openGraph: {
    title: "NNSC Body of the Month",
    description: "Fitness community platform for monthly competitions and progress tracking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
