import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const pastelColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(330, 80%, 85%)",
  "hsl(280, 70%, 85%)",
  "hsl(200, 70%, 85%)",
  "hsl(160, 60%, 85%)",
  "hsl(45, 80%, 85%)",
];

const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const generatedBalloons: Balloon[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 30 + Math.random() * 25,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
      color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
    }));
    setBalloons(generatedBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-float-balloon"
          style={{
            left: `${balloon.left}%`,
            bottom: "-100px",
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          {/* Balloon body */}
          <div
            className="relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${balloon.color} 0%, ${balloon.color.replace(")", " / 0.7)")} 100%)`,
                boxShadow: `inset -8px -8px 20px rgba(255,255,255,0.4), inset 4px 4px 10px rgba(0,0,0,0.05)`,
              }}
            />
            {/* Balloon highlight */}
            <div
              className="absolute rounded-full bg-white/40"
              style={{
                width: balloon.size * 0.25,
                height: balloon.size * 0.25,
                top: balloon.size * 0.15,
                left: balloon.size * 0.2,
              }}
            />
            {/* Balloon knot */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -4,
                width: 8,
                height: 8,
                background: balloon.color,
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              }}
            />
            {/* String */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -50,
                width: 1,
                height: 45,
                background: "hsl(var(--muted-foreground) / 0.3)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
