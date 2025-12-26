import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllJobs, type Job } from "@/lib/jobStore";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { RefreshCw, Database, Cpu, HardDrive, FileType, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const formatDate = (date: Date | null) => {
  if (!date) return "—";
  return format(date, "HH:mm:ss");
};

export const JobsTable = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchJobs = () => {
    setJobs(getAllJobs());
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    fetchJobs();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchJobs();
    
    if (autoRefresh) {
      const interval = setInterval(fetchJobs, 2000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-mono text-xl">Job Status Dashboard</CardTitle>
              <CardDescription className="font-mono text-xs">
                GET /api/v1/job/{'{'} id {'}'}/status
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`font-mono text-xs ${autoRefresh ? "border-primary/50 text-primary" : ""}`}
            >
              {autoRefresh ? "Auto-refresh: ON" : "Auto-refresh: OFF"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-border/50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="font-mono text-sm text-muted-foreground">
              No jobs submitted yet
            </p>
            <p className="font-mono text-xs text-muted-foreground/70 mt-1">
              Submit a job to see it appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="font-mono text-xs text-muted-foreground">Job ID</TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileType className="h-3 w-3" /> Conversion
                    </span>
                  </TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">Priority</TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">Status</TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">Queued At</TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">Started At</TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">Completed At</TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Cpu className="h-3 w-3" /> CPU
                    </span>
                  </TableHead>
                  <TableHead className="font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HardDrive className="h-3 w-3" /> Memory
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className="border-border/20 hover:bg-muted/30">
                    <TableCell className="font-mono text-xs text-foreground/80">
                      {job.id.slice(0, 18)}...
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      <span className="flex items-center gap-1">
                        <span className="text-foreground/70">{job.sourceFile}</span>
                        <ArrowRight className="h-3 w-3 text-primary" />
                        <span className="text-primary">{job.targetFormat}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={job.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={job.status} />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatDate(job.queuedAt)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatDate(job.startedAt)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatDate(job.completedAt)}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {job.metrics ? (
                        <span className="text-primary">{job.metrics.peakCpuUsage}%</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {job.metrics ? (
                        <span className="text-accent">{job.metrics.memoryUsageMb} MB</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
