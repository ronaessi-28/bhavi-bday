import { Heart, Sparkles } from "lucide-react";

const BirthdayMessage = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <Sparkles className="inline text-accent mb-4 animate-sparkle" size={32} />
          <h2 className="font-dancing text-4xl md:text-5xl text-gradient mb-4">
            A Message From My Heart
          </h2>
        </div>

        {/* Message Card */}
        <div className="bg-card-glass rounded-3xl p-8 md:p-12 shadow-soft border border-primary/10 animate-fade-in-up">
          <div className="space-y-6 text-center">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
              My dearest Bhavi,
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
              On this magical day, I want you to know how incredibly special you are to me. 
              Watching you grow has been the greatest joy of my life. Your laughter fills our 
              home with sunshine, and your smile brightens even the cloudiest days.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
              You are not just my sister – you are my best friend, my partner in mischief, 
              and my favorite person to share secrets with. Every moment with you is a treasure 
              that I hold close to my heart.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
              May this birthday bring you all the happiness in the world. May your dreams 
              take flight like beautiful butterflies, and may every wish you make come true.
            </p>
            <p className="text-xl md:text-2xl font-medium text-primary mt-8">
              I love you to the moon and back!
            </p>
            
            {/* Hearts decoration */}
            <div className="flex justify-center gap-2 pt-4">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="text-accent fill-accent animate-pulse"
                  size={20}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayMessage;
