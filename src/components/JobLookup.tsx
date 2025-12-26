import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getJobStatus, type Job } from "@/lib/jobStore";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Search, FileSearch, Clock, Cpu, HardDrive, FileType, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const formatTimestamp = (date: Date | null) => {
  if (!date) return "—";
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export const JobLookup = () => {
  const [jobId, setJobId] = useState("");
  const [job, setJob] = useState<Job | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!jobId.trim()) return;
    
    setLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const result = getJobStatus(jobId.trim());
    setJob(result);
    setSearched(true);
    setLoading(false);
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <FileSearch className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="font-mono text-xl">Job Status Lookup</CardTitle>
            <CardDescription className="font-mono text-xs">
              GET /api/v1/job/{'{id}'}/status
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter Job ID (e.g., job_1234567890_abc123def)"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="font-mono text-sm bg-background/50"
          />
          <Button 
            onClick={handleSearch} 
            disabled={loading || !jobId.trim()}
            className="font-mono"
          >
            {loading ? (
              <Search className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Lookup
              </>
            )}
          </Button>
        </div>
        
        {/* Result Display */}
        {searched && (
          <div className="space-y-4">
            {job ? (
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-4">
                {/* Job Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.status} />
                    <PriorityBadge priority={job.priority} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {job.id}
                  </span>
                </div>
                
                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileType className="h-4 w-4" />
                      <span className="font-mono text-xs">Conversion Task</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm">
                      <span className="text-foreground">{job.sourceFile}</span>
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span className="text-primary">{job.targetFormat}</span>
                    </div>
                  </div>
                  
                  {/* Timestamps */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono text-xs">Timeline</span>
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="text-foreground">{formatTimestamp(job.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Queued:</span>
                        <span className="text-foreground">{formatTimestamp(job.queuedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Started:</span>
                        <span className="text-foreground">{formatTimestamp(job.startedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="text-foreground">{formatTimestamp(job.completedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Resource Metrics */}
                {job.metrics && (
                  <div className="pt-4 border-t border-border/30">
                    <div className="font-mono text-xs text-muted-foreground mb-2">
                      Resource Metrics (JobMetrics Table)
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <Cpu className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-mono text-xs text-muted-foreground">Peak CPU</div>
                          <div className="font-mono text-lg font-bold text-primary">
                            {job.metrics.peakCpuUsage}%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <HardDrive className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-mono text-xs text-muted-foreground">Memory</div>
                          <div className="font-mono text-lg font-bold text-accent">
                            {job.metrics.memoryUsageMb} MB
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <p className="font-mono text-sm text-destructive">
                  Job not found: {jobId}
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  HTTP 404 - No job exists with this ID
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
