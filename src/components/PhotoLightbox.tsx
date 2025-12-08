import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoLightboxProps {
  photos: { src: string; caption: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PhotoLightbox = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/90 backdrop-blur-md animate-fade-in" />

      {/* Content */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-primary-foreground hover:bg-primary-foreground/20 rounded-full w-12 h-12"
        >
          <X size={28} />
        </Button>

        {/* Navigation - Previous */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 text-primary-foreground hover:bg-primary-foreground/20 rounded-full w-12 h-12 md:w-14 md:h-14"
        >
          <ChevronLeft size={32} />
        </Button>

        {/* Navigation - Next */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 text-primary-foreground hover:bg-primary-foreground/20 rounded-full w-12 h-12 md:w-14 md:h-14"
        >
          <ChevronRight size={32} />
        </Button>

        {/* Image Container */}
        <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center animate-scale-in">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.caption}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-glow"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Caption */}
        <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full">
            <Heart className="text-primary fill-primary" size={18} />
            <p className="font-dancing text-xl md:text-2xl text-foreground">
              {currentPhoto.caption}
            </p>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-primary scale-125"
                  : "bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;
