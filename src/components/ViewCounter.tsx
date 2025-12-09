import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ViewCounter = () => {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const incrementView = async () => {
      // Get current count
      const { data } = await supabase
        .from("page_views")
        .select("id, view_count")
        .limit(1)
        .maybeSingle();

      if (data) {
        const newCount = data.view_count + 1;
        
        // Update count
        await supabase
          .from("page_views")
          .update({ view_count: newCount })
          .eq("id", data.id);
        
        setViewCount(newCount);
      }
    };

    incrementView();
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-card-glass backdrop-blur-sm rounded-full px-4 py-2 shadow-soft border border-primary/20">
      <Eye className="text-primary" size={18} />
      <span className="text-sm font-medium text-foreground/80">
        {viewCount.toLocaleString()} views
      </span>
    </div>
  );
};

export default ViewCounter;
