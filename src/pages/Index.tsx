import { useConfetti } from "@/hooks/useConfetti";
import FloatingElements from "@/components/FloatingElements";
import HeroSection from "@/components/HeroSection";
import BirthdayMessage from "@/components/BirthdayMessage";
import MemoriesSection from "@/components/MemoriesSection";
import MadeWithLove from "@/components/MadeWithLove";
import Footer from "@/components/Footer";

const Index = () => {
  // Trigger confetti on page load
  useConfetti();

  return (
    <div className="min-h-screen bg-magical relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <BirthdayMessage />
        <MemoriesSection />
        <MadeWithLove />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
