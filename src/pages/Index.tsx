import { useConfetti } from "@/hooks/useConfetti";
import FloatingElements from "@/components/FloatingElements";
import FloatingBalloons from "@/components/FloatingBalloons";
import Butterflies from "@/components/Butterflies";
import HeroSection from "@/components/HeroSection";
import AgeCounter from "@/components/AgeCounter";
import CountdownTimer from "@/components/CountdownTimer";
import BirthdayMessage from "@/components/BirthdayMessage";
import MemoriesSection from "@/components/MemoriesSection";
import MadeWithLove from "@/components/MadeWithLove";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  // Trigger confetti on page load
  useConfetti();

  return (
    <div className="min-h-screen bg-magical relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Floating Balloons */}
      <FloatingBalloons />
      
      {/* Butterflies */}
      <Butterflies />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AgeCounter />
        <CountdownTimer />
        <BirthdayMessage />
        <MemoriesSection />
        <MadeWithLove />
        <Footer />
      </main>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Index;
