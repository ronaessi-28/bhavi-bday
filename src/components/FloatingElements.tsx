import { Heart, Sparkles, Star } from "lucide-react";

const FloatingElements = () => {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 16 + Math.random() * 16,
  }));

  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <Heart
          key={`heart-${heart.id}`}
          className="absolute text-primary/40 fill-primary/20"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            width: heart.size,
            height: heart.size,
            animation: `float-up ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <Sparkles
          key={`sparkle-${sparkle.id}`}
          className="absolute text-accent/50"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: sparkle.size,
            height: sparkle.size,
            animation: `sparkle 2s ease-in-out infinite`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Corner Stars */}
      <Star
        className="absolute top-10 left-10 text-accent/30 fill-accent/20 animate-pulse-glow"
        size={32}
      />
      <Star
        className="absolute top-20 right-20 text-primary/30 fill-primary/20 animate-pulse-glow animation-delay-500"
        size={24}
      />
      <Star
        className="absolute bottom-40 left-20 text-secondary/40 fill-secondary/20 animate-pulse-glow animation-delay-300"
        size={28}
      />
      <Star
        className="absolute bottom-20 right-10 text-accent/30 fill-accent/20 animate-pulse-glow animation-delay-700"
        size={20}
      />
    </div>
  );
};

export default FloatingElements;
