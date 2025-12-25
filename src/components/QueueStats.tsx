import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getQueueStats } from "@/lib/jobStore";
import { Zap, Clock, CheckCircle2, XCircle, Layers } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <Card className="border-border/50 bg-card/50">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <p className={`font-mono text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')}/10`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const QueueStats = () => {
  const [stats, setStats] = useState(getQueueStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getQueueStats());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <StatCard
        icon={<Layers className="h-5 w-5 text-foreground" />}
        label="Total Jobs"
        value={stats.totalCount}
        color="text-foreground"
      />
      <StatCard
        icon={<Zap className="h-5 w-5 text-primary" />}
        label="High Priority"
        value={stats.highPriorityCount}
        color="text-primary"
      />
      <StatCard
        icon={<Clock className="h-5 w-5 text-accent" />}
        label="Low Priority"
        value={stats.lowPriorityCount}
        color="text-accent"
      />
      <StatCard
        icon={<CheckCircle2 className="h-5 w-5 text-success" />}
        label="Completed"
        value={stats.completedCount}
        color="text-success"
      />
      <StatCard
        icon={<XCircle className="h-5 w-5 text-destructive" />}
        label="Failed"
        value={stats.failedCount}
        color="text-destructive"
      />
    </div>
  );
};
