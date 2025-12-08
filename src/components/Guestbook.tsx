import { useState, useEffect } from "react";
import { Heart, Send, MessageCircle, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { triggerWishConfetti } from "@/lib/confetti";

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const Guestbook = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch wishes on mount
  useEffect(() => {
    fetchWishes();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("wishes-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "birthday_wishes",
        },
        (payload) => {
          const newWish = payload.new as Wish;
          setWishes((prev) => [newWish, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from("birthday_wishes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in both your name and message");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("birthday_wishes").insert({
        name: name.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      triggerWishConfetti();
      toast.success("Your birthday wish has been sent! 🎂");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error sending wish:", error);
      toast.error("Failed to send your wish. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="relative py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <MessageCircle className="inline text-primary mb-4" size={40} />
          <h2 className="font-dancing text-4xl md:text-6xl text-gradient mb-4">
            Birthday Wishes
          </h2>
          <p className="text-muted-foreground text-lg">
            Leave a special message for Bhavi 💕
          </p>
        </div>

        {/* Wish Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card-glass rounded-3xl p-6 md:p-8 shadow-card mb-12 animate-fade-in-up"
        >
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="pl-12 bg-background/50 border-primary/20 focus:border-primary rounded-xl h-12"
                maxLength={50}
              />
            </div>
            <div className="relative">
              <Sparkles className="absolute left-4 top-4 text-muted-foreground" size={20} />
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your birthday wish for Bhavi..."
                className="pl-12 bg-background/50 border-primary/20 focus:border-primary rounded-xl min-h-[120px] resize-none"
                maxLength={500}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={18} />
                  Send Birthday Wish
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Wishes List */}
        <div className="space-y-6">
          <h3 className="font-dancing text-2xl md:text-3xl text-center text-gradient mb-8">
            Messages from loved ones ({wishes.length})
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="inline mb-4 animate-bounce-soft" size={40} />
              <p>Be the first to send a birthday wish!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {wishes.map((wish, index) => (
                <div
                  key={wish.id}
                  className="group bg-card-glass rounded-2xl p-5 md:p-6 shadow-soft transition-all duration-500 hover:shadow-glow hover:scale-[1.01] animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Heart className="text-primary group-hover:scale-110 transition-transform" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-medium text-foreground truncate">
                          {wish.name}
                        </h4>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDate(wish.created_at)}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {wish.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
