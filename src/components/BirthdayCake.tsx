import { useState } from "react";
import { Sparkles } from "lucide-react";
import { triggerWishConfetti } from "@/lib/confetti";

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState(false);

  const blowCandle = (index: number) => {
    if (!candlesLit[index]) return;
    
    const newCandlesLit = [...candlesLit];
    newCandlesLit[index] = false;
    setCandlesLit(newCandlesLit);

    // Check if all candles are blown
    if (newCandlesLit.every(lit => !lit)) {
      setAllBlown(true);
      triggerWishConfetti();
    }
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setAllBlown(false);
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-dancing text-3xl md:text-4xl text-gradient mb-8">
          Blow Out The Candles! 🎂
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Click on each candle to blow it out
        </p>

        {/* Cake Container */}
        <div className="relative inline-block">
          {/* Candles */}
          <div className="flex justify-center gap-4 mb-2 relative z-10">
            {candlesLit.map((lit, index) => (
              <button
                key={index}
                onClick={() => blowCandle(index)}
                className="relative cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                disabled={!lit}
              >
                {/* Candle */}
                <div className="w-3 h-12 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-sm relative">
                  {/* Flame */}
                  {lit && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full animate-flicker" />
                        <div className="absolute inset-0 w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full blur-sm animate-flicker" />
                      </div>
                    </div>
                  )}
                  {/* Smoke when blown */}
                  {!lit && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-fade-up">
                      <div className="w-2 h-4 bg-muted-foreground/30 rounded-full blur-sm" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Cake Top (Frosting) */}
          <div className="w-48 h-8 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-3xl mx-auto relative">
            <div className="absolute top-2 left-4 w-2 h-2 bg-red-400 rounded-full" />
            <div className="absolute top-3 left-12 w-2 h-2 bg-blue-400 rounded-full" />
            <div className="absolute top-2 right-4 w-2 h-2 bg-green-400 rounded-full" />
            <div className="absolute top-3 right-12 w-2 h-2 bg-yellow-400 rounded-full" />
          </div>

          {/* Cake Body */}
          <div className="w-56 h-20 bg-gradient-to-b from-amber-200 to-amber-300 mx-auto relative rounded-b-lg">
            {/* Frosting drips */}
            <div className="absolute top-0 left-4 w-3 h-6 bg-pink-300 rounded-b-full" />
            <div className="absolute top-0 left-12 w-4 h-8 bg-pink-300 rounded-b-full" />
            <div className="absolute top-0 right-4 w-3 h-5 bg-pink-300 rounded-b-full" />
            <div className="absolute top-0 right-12 w-4 h-7 bg-pink-300 rounded-b-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-6 bg-pink-300 rounded-b-full" />
          </div>

          {/* Cake Plate */}
          <div className="w-64 h-4 bg-gradient-to-b from-muted to-muted-foreground/20 rounded-full mx-auto shadow-md" />
        </div>

        {/* Success Message */}
        {allBlown && (
          <div className="mt-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="animate-sparkle" size={24} />
              <span className="font-dancing text-2xl">Make a Wish! ✨</span>
              <Sparkles className="animate-sparkle" size={24} />
            </div>
            <button
              onClick={relightCandles}
              className="mt-4 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors text-sm font-medium"
            >
              Light Candles Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BirthdayCake;
