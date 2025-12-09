import { Heart, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Stars Decoration */}
        <div className="flex justify-center gap-4 mb-8">
          <Star className="text-primary/40 fill-primary/20" size={16} />
          <Star className="text-accent/40 fill-accent/20" size={20} />
          <Star className="text-secondary/40 fill-secondary/20" size={24} />
          <Star className="text-accent/40 fill-accent/20" size={20} />
          <Star className="text-primary/40 fill-primary/20" size={16} />
        </div>

        {/* Main Footer Message */}
        <p className="font-dancing text-2xl md:text-3xl text-foreground/80 mb-8 leading-relaxed">
          May your life be filled with joy, love, and endless smiles.
        </p>
        
        <p className="font-dancing text-3xl md:text-4xl text-gradient font-semibold mb-8">
          Happy Birthday, Bhavi & Bhavya!
        </p>

        <p className="text-muted-foreground mb-4">
          Wishes by Viney 💝
        </p>

        {/* Hearts Row */}
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(7)].map((_, i) => (
            <Heart
              key={i}
              className="text-primary fill-primary/80 animate-float-heart"
              size={16 + (i === 3 ? 8 : i % 2 === 0 ? 4 : 0)}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          With all my love, forever and always ✨
        </p>
      </div>
    </footer>
  );
};

export default Footer;
