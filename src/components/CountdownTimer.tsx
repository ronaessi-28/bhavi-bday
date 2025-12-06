import { useEffect, useState } from "react";
import { Calendar, Clock, Gift, Heart, PartyPopper } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeData, setTimeData] = useState<{
    isBeforeBirthday: boolean;
    isBirthday: boolean;
    timeLeft: TimeLeft;
    daysSince: number;
  }>({
    isBeforeBirthday: false,
    isBirthday: false,
    timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    daysSince: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Birthday is December 9th
      let birthdayThisYear = new Date(currentYear, 11, 9, 0, 0, 0); // Month is 0-indexed
      
      // Check if today is the birthday
      const isToday = now.getMonth() === 11 && now.getDate() === 9;
      
      if (isToday) {
        setTimeData({
          isBeforeBirthday: false,
          isBirthday: true,
          timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
          daysSince: 0,
        });
        return;
      }

      // If birthday hasn't happened yet this year
      if (now < birthdayThisYear) {
        const diff = birthdayThisYear.getTime() - now.getTime();
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeData({
          isBeforeBirthday: true,
          isBirthday: false,
          timeLeft: { days, hours, minutes, seconds },
          daysSince: 0,
        });
      } else {
        // Birthday has passed this year
        const diff = now.getTime() - birthdayThisYear.getTime();
        const daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));

        setTimeData({
          isBeforeBirthday: false,
          isBirthday: false,
          timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
          daysSince,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative bg-card-glass rounded-2xl p-4 md:p-6 shadow-soft border border-primary/20 min-w-[70px] md:min-w-[90px]">
        <span className="font-dancing text-3xl md:text-5xl font-bold text-gradient">
          {value.toString().padStart(2, '0')}
        </span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </div>
      <span className="text-sm text-muted-foreground mt-2 font-medium">{label}</span>
    </div>
  );

  // Birthday Today Message
  if (timeData.isBirthday) {
    return (
      <section className="relative py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card-glass rounded-3xl p-8 md:p-12 shadow-glow border border-accent/30 text-center animate-pulse-glow">
            <div className="flex justify-center gap-4 mb-6">
              <PartyPopper className="text-accent animate-wiggle" size={40} />
              <Gift className="text-primary animate-bounce-soft" size={48} />
              <PartyPopper className="text-accent animate-wiggle animation-delay-300" size={40} />
            </div>
            
            <h3 className="font-dancing text-4xl md:text-6xl text-gradient mb-4">
              It's Your Birthday Today!
            </h3>
            
            <p className="text-xl text-foreground/80">
              🎂 Happy 7th Birthday, Bhavi! 🎂
            </p>
            
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(7)].map((_, i) => (
                <Heart
                  key={i}
                  className="text-accent fill-accent animate-float-heart"
                  size={20}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Countdown to Birthday
  if (timeData.isBeforeBirthday) {
    return (
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-card-glass rounded-full px-6 py-2 shadow-soft mb-4">
              <Clock className="text-primary animate-pulse" size={20} />
              <span className="text-sm font-medium text-foreground/80">Countdown to the Big Day!</span>
            </div>
            <h3 className="font-dancing text-3xl md:text-4xl text-gradient">
              Birthday is Coming Soon!
            </h3>
          </div>

          <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
            <TimeBox value={timeData.timeLeft.days} label="Days" />
            <TimeBox value={timeData.timeLeft.hours} label="Hours" />
            <TimeBox value={timeData.timeLeft.minutes} label="Minutes" />
            <TimeBox value={timeData.timeLeft.seconds} label="Seconds" />
          </div>

          <p className="text-center text-muted-foreground mt-6 flex items-center justify-center gap-2">
            <Calendar className="text-primary" size={16} />
            December 9th, 2025
          </p>
        </div>
      </section>
    );
  }

  // Days Since Birthday
  return (
    <section className="relative py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card-glass rounded-3xl p-8 md:p-12 shadow-soft border border-primary/20 text-center">
          <div className="flex justify-center mb-6">
            <Gift className="text-primary animate-bounce-soft" size={40} />
          </div>
          
          <h3 className="font-dancing text-3xl md:text-4xl text-gradient mb-4">
            Celebrating Since
          </h3>
          
          <div className="flex items-center justify-center gap-4">
            <span className="font-dancing text-6xl md:text-7xl font-bold text-gradient">
              {timeData.daysSince}
            </span>
            <span className="text-xl text-muted-foreground">
              {timeData.daysSince === 1 ? 'day' : 'days'} of being 7!
            </span>
          </div>
          
          <p className="text-muted-foreground mt-4">
            The birthday celebration continues! 🎉
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
