import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/jobStore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const isHigh = priority === "high";
  
  return (
    <span
      className={cn(
        "status-badge",
        isHigh ? "priority-high" : "priority-low",
        className
      )}
    >
      {isHigh ? (
        <ArrowUp className="mr-1 h-3 w-3" />
      ) : (
        <ArrowDown className="mr-1 h-3 w-3" />
      )}
      {priority}
    </span>
  );
};
