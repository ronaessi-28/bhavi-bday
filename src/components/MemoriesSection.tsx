import { useState } from "react";
import { Heart, Camera } from "lucide-react";
import sisters1 from "@/assets/sisters-1.jpg";
import sisters2 from "@/assets/sisters-2.jpg";
import sisters3 from "@/assets/sisters-3.jpg";
import sisters4 from "@/assets/sisters-4.jpg";

type HoverEffect = "tilt" | "zoom-rotate" | "flip" | "bounce";

const MemoriesSection = () => {
  const photos: { src: string; caption: string; effect: HoverEffect }[] = [
    { src: sisters1, caption: "Sisters forever 💕", effect: "tilt" },
    { src: sisters2, caption: "Best friends 💖", effect: "zoom-rotate" },
    { src: sisters3, caption: "Fun times together ✨", effect: "flip" },
    { src: sisters4, caption: "Making memories 🌸", effect: "bounce" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getHoverClass = (effect: HoverEffect, isHovered: boolean) => {
    if (!isHovered) return "";
    
    switch (effect) {
      case "tilt":
        return "animate-photo-tilt";
      case "zoom-rotate":
        return "animate-photo-zoom-rotate";
      case "flip":
        return "animate-photo-flip";
      case "bounce":
        return "animate-photo-bounce";
      default:
        return "";
    }
  };

  return (
    <section className="relative py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <Camera className="inline text-primary mb-4 animate-bounce-soft" size={40} />
          <h2 className="font-dancing text-4xl md:text-6xl text-gradient mb-4">
            Our Precious Memories
          </h2>
          <p className="text-muted-foreground text-lg">
            Hover over photos for magical effects ✨
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group animate-fade-in-up perspective-1000"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`photo-frame transform transition-all duration-500 hover:shadow-glow ${getHoverClass(photo.effect, hoveredIndex === index)}`}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>
                
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-primary-foreground font-medium text-center flex items-center justify-center gap-2">
                    <Heart className="fill-accent text-accent animate-pulse" size={16} />
                    {photo.caption}
                  </p>
                </div>

                {/* Effect Label */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.effect === "tilt" && "Tilt"}
                  {photo.effect === "zoom-rotate" && "Zoom & Spin"}
                  {photo.effect === "flip" && "3D Flip"}
                  {photo.effect === "bounce" && "Bounce"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center mt-12 gap-3">
          <Heart className="text-primary/40 fill-primary/20 animate-pulse" size={20} />
          <Heart className="text-accent/40 fill-accent/20 animate-bounce-soft" size={28} />
          <Heart className="text-primary/40 fill-primary/20 animate-pulse" size={20} />
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
