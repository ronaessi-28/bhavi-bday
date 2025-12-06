import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Play, Pause } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Birthday music URL (royalty-free happy birthday tune)
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 animate-bounce-soft">
          <div className="bg-card-glass backdrop-blur-md rounded-xl px-4 py-2 shadow-soft border border-primary/20 whitespace-nowrap">
            <p className="text-sm text-foreground/80 flex items-center gap-2">
              <Music className="text-primary" size={14} />
              Click to play music!
            </p>
          </div>
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-card/80" />
        </div>
      )}

      {/* Music Button */}
      <button
        onClick={togglePlay}
        className={`
          relative group w-14 h-14 rounded-full 
          bg-gradient-to-br from-primary via-accent to-primary
          shadow-glow hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)]
          transition-all duration-300 hover:scale-110
          flex items-center justify-center
          ${isPlaying ? 'animate-pulse-glow' : ''}
        `}
      >
        {/* Ripple Effect when playing */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping animation-delay-300" />
          </>
        )}

        {/* Icon */}
        <div className="relative z-10 text-primary-foreground">
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <Pause size={24} />
            </div>
          ) : (
            <Play size={24} className="ml-1" />
          )}
        </div>

        {/* Music Notes Animation */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2">
            <Music className="text-accent animate-bounce-soft" size={16} />
          </div>
        )}
      </button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Volume Indicator */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isPlaying ? (
          <Volume2 className="text-primary" size={20} />
        ) : (
          <VolumeX className="text-muted-foreground" size={20} />
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
