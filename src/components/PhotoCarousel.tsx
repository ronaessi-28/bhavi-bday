import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import sisters1 from "@/assets/sisters-1.jpg";
import sisters2 from "@/assets/sisters-2.jpg";
import sisters3 from "@/assets/sisters-3.jpg";
import sisters4 from "@/assets/sisters-4.jpg";

const PhotoCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const photos = [
    { src: sisters1, caption: "Sisters forever 💕" },
    { src: sisters2, caption: "Best friends 💖" },
    { src: sisters3, caption: "Fun times together ✨" },
    { src: sisters4, caption: "Making memories 🌸" },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <Sparkles className="inline text-primary mb-4 animate-pulse" size={40} />
          <h2 className="font-dancing text-4xl md:text-6xl text-gradient mb-4">
            Magical Moments
          </h2>
          <p className="text-muted-foreground text-lg">
            Swipe through our beautiful memories
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                <div className="relative group">
                  <div className="overflow-hidden rounded-3xl shadow-glow transition-all duration-500 group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)]">
                    <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-primary-foreground font-dancing text-2xl md:text-3xl text-center">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-2 md:left-4 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors" />
          <CarouselNext className="right-2 md:right-4 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors" />
        </Carousel>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index + 1
                  ? "bg-primary scale-125"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
