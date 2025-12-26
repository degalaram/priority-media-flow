import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllJobs, type Job } from "@/lib/jobStore";
import { StatusBadge } from "./StatusBadge";
import { Zap, Clock, ArrowRight } from "lucide-react";

export const QueueVisualization = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = () => setJobs(getAllJobs());
    fetchJobs();
    
    const interval = setInterval(fetchJobs, 1000);
    return () => clearInterval(interval);
  }, []);

  const highPriorityJobs = jobs.filter(
    (j) => j.priority === "high" && ["PENDING", "QUEUED", "IN_PROGRESS"].includes(j.status)
  );
  const lowPriorityJobs = jobs.filter(
    (j) => j.priority === "low" && ["PENDING", "QUEUED", "IN_PROGRESS"].includes(j.status)
  );

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Celery Queue Visualization</CardTitle>
        <CardDescription className="font-mono text-xs">
          Two distinct queues: high_priority & low_priority
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* High Priority Queue */}
        <div className="p-4 rounded-lg bg-high-priority/10 border border-high-priority/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-high-priority" />
              <span className="font-mono text-sm font-semibold text-high-priority">
                high_priority queue
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {highPriorityJobs.length} active job(s)
            </span>
          </div>
          
          {highPriorityJobs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {highPriorityJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-background/50 border border-high-priority/20"
                >
                  <span className="font-mono text-xs text-foreground/70">
                    {job.id.slice(4, 18)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <StatusBadge status={job.status} />
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-muted-foreground">
              Queue empty - no high priority jobs pending
            </p>
          )}
        </div>
        
        {/* Low Priority Queue */}
        <div className="p-4 rounded-lg bg-low-priority/10 border border-low-priority/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-low-priority" />
              <span className="font-mono text-sm font-semibold text-low-priority">
                low_priority queue
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {lowPriorityJobs.length} active job(s)
            </span>
          </div>
          
          {lowPriorityJobs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {lowPriorityJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-background/50 border border-low-priority/20"
                >
                  <span className="font-mono text-xs text-foreground/70">
                    {job.id.slice(4, 18)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <StatusBadge status={job.status} />
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-muted-foreground">
              Queue empty - no low priority jobs pending
            </p>
          )}
        </div>
        
        {/* Worker Info */}
        <div className="pt-4 border-t border-border/30">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground">Note:</span> High priority jobs are processed faster 
            (1s queue delay vs 2.5s for low priority). Each worker processes jobs from its dedicated queue.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
