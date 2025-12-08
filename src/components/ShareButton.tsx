import { useState } from "react";
import { Share2, Copy, Check, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: "Happy 7th Birthday Bhavi! 🎂💕",
    text: "Celebrate Bhavi's 7th birthday with us! Send your birthday wishes and see our precious memories together.",
    url: window.location.href,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
    window.open(url, "_blank");
  };

  // Check if native share is supported (mainly mobile)
  const supportsNativeShare = typeof navigator !== "undefined" && navigator.share;

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {supportsNativeShare ? (
        <Button
          onClick={handleNativeShare}
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-glow animate-bounce-soft"
        >
          <Share2 size={24} />
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-glow animate-bounce-soft"
            >
              <Share2 size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-background/95 backdrop-blur-sm border-primary/20 rounded-xl p-2"
          >
            <DropdownMenuItem
              onClick={handleCopyLink}
              className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-primary/10"
            >
              {copied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="text-muted-foreground" />
              )}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleFacebookShare}
              className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-primary/10"
            >
              <Facebook size={18} className="text-blue-600" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleTwitterShare}
              className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-primary/10"
            >
              <Twitter size={18} className="text-sky-500" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleWhatsAppShare}
              className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-primary/10"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className="text-green-500 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ShareButton;
