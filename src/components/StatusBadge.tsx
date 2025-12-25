import { cn } from "@/lib/utils";
import type { JobStatus } from "@/lib/jobStore";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "status-pending" },
  QUEUED: { label: "Queued", className: "status-queued" },
  IN_PROGRESS: { label: "In Progress", className: "status-in-progress animate-pulse-glow" },
  COMPLETED: { label: "Completed", className: "status-completed" },
  FAILED: { label: "Failed", className: "status-failed" },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn("status-badge", config.className, className)}>
      {status === "IN_PROGRESS" && (
        <span className="mr-1.5 h-2 w-2 rounded-full bg-current animate-pulse" />
      )}
      {config.label}
    </span>
  );
};
