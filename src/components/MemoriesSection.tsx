import { Heart, Camera } from "lucide-react";
import sisters1 from "@/assets/sisters-1.jpg";
import sisters2 from "@/assets/sisters-2.jpg";
import sisters3 from "@/assets/sisters-3.jpg";
import sisters4 from "@/assets/sisters-4.jpg";

const MemoriesSection = () => {
  const photos = [
    { src: sisters1, caption: "Sisters forever 💕" },
    { src: sisters2, caption: "Best friends 💖" },
    { src: sisters3, caption: "Fun times together ✨" },
    { src: sisters4, caption: "Making memories 🌸" },
  ];

  return (
    <section className="relative py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <Camera className="inline text-primary mb-4" size={40} />
          <h2 className="font-dancing text-4xl md:text-6xl text-gradient mb-4">
            Our Precious Memories
          </h2>
          <p className="text-muted-foreground text-lg">
            Moments we cherish forever
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="photo-frame transform transition-all duration-500 hover:scale-[1.02] hover:shadow-glow">
                <div className="aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6 rounded-b-xl">
                  <p className="text-primary-foreground font-medium text-center flex items-center justify-center gap-2">
                    <Heart className="fill-accent text-accent" size={16} />
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center mt-12 gap-3">
          <Heart className="text-primary/40 fill-primary/20" size={20} />
          <Heart className="text-accent/40 fill-accent/20" size={28} />
          <Heart className="text-primary/40 fill-primary/20" size={20} />
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
