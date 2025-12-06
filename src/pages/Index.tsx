import { useConfetti } from "@/hooks/useConfetti";
import FloatingElements from "@/components/FloatingElements";
import Butterflies from "@/components/Butterflies";
import HeroSection from "@/components/HeroSection";
import AgeCounter from "@/components/AgeCounter";
import CountdownTimer from "@/components/CountdownTimer";
import BirthdayMessage from "@/components/BirthdayMessage";
import MemoriesSection from "@/components/MemoriesSection";
import MadeWithLove from "@/components/MadeWithLove";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import PDFDownload from "@/components/PDFDownload";

const Index = () => {
  // Trigger confetti on page load
  useConfetti();

  return (
    <div className="min-h-screen bg-magical relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Butterflies */}
      <Butterflies />

      {/* Main Content - wrapped for PDF capture */}
      <main id="birthday-content" className="relative z-10">
        <HeroSection />
        <AgeCounter />
        <CountdownTimer />
        <BirthdayMessage />
        <MemoriesSection />
        <MadeWithLove />
        
        {/* PDF Download Button */}
        <PDFDownload targetId="birthday-content" />
        
        <Footer />
      </main>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Index;
