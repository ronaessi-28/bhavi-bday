import { Heart, Sparkles } from "lucide-react";

const MadeWithLove = () => {
  return (
    <div className="flex justify-center py-12">
      <div className="relative group">
        {/* Glowing Button */}
        <div className="relative bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-pulse-glow rounded-full px-8 py-4 shadow-glow overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <div className="flex items-center gap-3 relative z-10">
            <Sparkles className="text-primary-foreground" size={20} />
            <span className="font-medium text-lg text-primary-foreground">
              Made with love by Viney
            </span>
            <Heart className="text-primary-foreground fill-primary-foreground animate-pulse" size={20} />
          </div>
        </div>

        {/* Decorative Sparkles */}
        <Sparkles 
          className="absolute -top-2 -right-2 text-accent animate-sparkle" 
          size={16} 
        />
        <Sparkles 
          className="absolute -bottom-2 -left-2 text-primary animate-sparkle animation-delay-300" 
          size={14} 
        />
      </div>
    </div>
  );
};

export default MadeWithLove;
