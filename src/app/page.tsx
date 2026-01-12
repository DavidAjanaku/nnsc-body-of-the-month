import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { CommunityGallery } from "@/components/home/CommunityGallery";
import { WinnersShowcase } from "@/components/home/WinnersShowcase";
import { Footer } from "@/components/layout/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <NavbarWrapper />
      <Hero />
      <Benefits />
      <CommunityGallery />
      <WinnersShowcase />
      <Footer />
    </main>
  );
}
