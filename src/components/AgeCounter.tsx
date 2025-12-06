import { useEffect, useState } from "react";
import { Cake, Sparkles, Star } from "lucide-react";

const AgeCounter = () => {
  const [displayAge, setDisplayAge] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetAge = 7;

  useEffect(() => {
    // Trigger animation after a short delay
    const visibilityTimer = setTimeout(() => setIsVisible(true), 500);

    return () => clearTimeout(visibilityTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate the number counting up
    let current = 0;
    const increment = targetAge / 20;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetAge) {
        setDisplayAge(targetAge);
        clearInterval(timer);
      } else {
        setDisplayAge(Math.floor(current));
      }
    }, 80);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section className="relative py-16 px-4">
      <div className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative bg-card-glass rounded-3xl p-8 md:p-12 shadow-glow border border-primary/20 text-center overflow-hidden">
          {/* Background Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-accent/30 animate-sparkle"
                size={12 + Math.random() * 8}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Stars decoration */}
          <div className="flex justify-center gap-4 mb-6 relative z-10">
            <Star className="text-accent fill-accent/50 animate-wiggle" size={24} />
            <Cake className="text-primary animate-bounce-soft" size={32} />
            <Star className="text-accent fill-accent/50 animate-wiggle animation-delay-300" size={24} />
          </div>

          {/* Age Number */}
          <div className="relative z-10 mb-4">
            <div className="relative inline-block">
              <span 
                className="font-dancing text-8xl md:text-9xl font-bold text-gradient"
                style={{
                  textShadow: '0 0 40px hsl(var(--primary) / 0.5)',
                }}
              >
                {displayAge}
              </span>
              
              {/* Celebration burst when reaches target */}
              {displayAge === targetAge && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full animate-ping bg-accent/10 rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Text */}
          <h3 className="font-dancing text-3xl md:text-4xl text-foreground/90 mb-2 relative z-10">
            Turning {targetAge} years old!
          </h3>
          
          <p className="text-muted-foreground relative z-10">
            Growing more beautiful every day ✨
          </p>

          {/* Bottom decoration */}
          <div className="flex justify-center gap-2 mt-6 relative z-10">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i < displayAge ? 'bg-primary animate-scale-in' : 'bg-muted'}`}
                style={{ 
                  animationDelay: `${i * 0.1 + 1}s`,
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgeCounter;
