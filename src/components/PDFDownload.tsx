import { useState, useCallback } from "react";
import { Download, Loader2, FileDown } from "lucide-react";

interface PDFDownloadProps {
  targetId: string;
}

const PDFDownload = ({ targetId }: PDFDownloadProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsGenerating(true);

    try {
      const element = document.getElementById(targetId);
      if (!element) {
        throw new Error("Target element not found");
      }

      // Dynamically import html2pdf
      const html2pdf = (await import("html2pdf.js")).default;

      const options = {
        margin: 0,
        filename: "Happy-Birthday-Bhavi.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#fdf2f8",
          logging: false,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [targetId]);

  return (
    <div className="flex justify-center py-8">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] rounded-full px-8 py-4 shadow-soft transition-all duration-300 hover:shadow-glow hover:scale-105 disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-3 text-primary-foreground font-medium text-lg">
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FileDown size={22} />
              <span>Download Birthday Page as PDF</span>
              <Download size={18} className="group-hover:animate-bounce" />
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default PDFDownload;
