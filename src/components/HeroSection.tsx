import { Heart, Cake, Gift } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Decorative Icons */}
      <div className="absolute top-10 left-1/4 animate-bounce-soft">
        <Gift className="text-primary/60" size={40} />
      </div>
      <div className="absolute top-20 right-1/4 animate-bounce-soft animation-delay-300">
        <Cake className="text-accent/60" size={36} />
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-3xl mx-auto">
        {/* Birthday Badge */}
        <div className="inline-flex items-center gap-2 bg-card-glass rounded-full px-6 py-2 shadow-soft mb-8 animate-fade-in-up">
          <Cake className="text-primary" size={20} />
          <span className="text-sm font-medium text-foreground/80">9 December 2018</span>
          <Heart className="text-accent fill-accent" size={16} />
        </div>

        {/* Main Heading */}
        <h1 className="font-dancing text-6xl md:text-8xl lg:text-9xl text-gradient mb-6 animate-fade-in-up animation-delay-100 leading-tight">
          Happy Birthday, Bhavi!
        </h1>

        {/* Subheading */}
        <p className="text-2xl md:text-3xl font-medium text-foreground/90 mb-4 animate-fade-in-up animation-delay-200">
          You are the best sister ever{" "}
          <Heart className="inline text-accent fill-accent animate-pulse" size={28} />
        </p>

        {/* Birthday Date */}
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up animation-delay-300">
          Celebrating your special day!
        </p>

        {/* Decorative Hearts */}
        <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-400">
          <Heart className="text-primary/60 fill-primary/40 animate-float-heart" size={24} />
          <Heart className="text-accent/60 fill-accent/40 animate-float-heart animation-delay-200" size={32} />
          <Heart className="text-secondary/60 fill-secondary/40 animate-float-heart animation-delay-400" size={24} />
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
