import confetti from "canvas-confetti";

const colors = ["#ec4899", "#f472b6", "#c084fc", "#f9a8d4", "#fda4af"];

export const triggerWishConfetti = () => {
  // Center burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.6 },
    colors,
    shapes: ["circle", "star"],
    scalar: 1.5,
  });

  // Left burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
      shapes: ["circle"],
    });
  }, 100);

  // Right burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
      shapes: ["circle"],
    });
  }, 200);

  // Hearts emoji burst
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ff6b9d", "#c44569", "#f78fb3"],
      shapes: ["circle"],
      scalar: 2,
      gravity: 0.5,
    });
  }, 300);
};
