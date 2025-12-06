import { useEffect } from "react";
import confetti from "canvas-confetti";

export const useConfetti = () => {
  useEffect(() => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const colors = ["#ec4899", "#f472b6", "#c084fc", "#f9a8d4", "#fda4af"];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Launch from left side
      confetti({
        particleCount: Math.floor(particleCount),
        startVelocity: 30,
        spread: 60,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: 1.2,
        drift: 0,
      });

      // Launch from right side
      confetti({
        particleCount: Math.floor(particleCount),
        startVelocity: 30,
        spread: 60,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: 1.2,
        drift: 0,
      });
    }, 250);

    // Initial burst from center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors,
      shapes: ["circle"],
      scalar: 1.5,
    });

    return () => clearInterval(interval);
  }, []);
};
