import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Key, Link2 } from "lucide-react";

export const DatabaseSchema = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-mono text-xl">Database Schema</CardTitle>
            <CardDescription className="font-mono text-xs">
              PostgreSQL Tables Design
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Table */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm font-semibold text-foreground">
                Job
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                (Operational State)
              </span>
            </div>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-primary/20">
                <Key className="h-3 w-3 text-primary" />
                <span className="text-primary font-semibold">id</span>
                <span className="text-muted-foreground ml-auto">VARCHAR(50) PK</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">source_file</span>
                <span className="text-muted-foreground ml-auto">VARCHAR(255)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">target_format</span>
                <span className="text-muted-foreground ml-auto">VARCHAR(50)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">priority</span>
                <span className="text-muted-foreground ml-auto">ENUM('high','low')</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">status</span>
                <span className="text-muted-foreground ml-auto">ENUM(...)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">created_at</span>
                <span className="text-muted-foreground ml-auto">TIMESTAMP</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">queued_at</span>
                <span className="text-muted-foreground ml-auto">TIMESTAMP NULL</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">started_at</span>
                <span className="text-muted-foreground ml-auto">TIMESTAMP NULL</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">completed_at</span>
                <span className="text-muted-foreground ml-auto">TIMESTAMP NULL</span>
              </div>
            </div>
          </div>
          
          {/* JobMetrics Table */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-accent" />
              <span className="font-mono text-sm font-semibold text-foreground">
                JobMetrics
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                (Resource Usage)
              </span>
            </div>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-primary/20">
                <Key className="h-3 w-3 text-primary" />
                <span className="text-primary font-semibold">id</span>
                <span className="text-muted-foreground ml-auto">VARCHAR(50) PK</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-accent/20">
                <Link2 className="h-3 w-3 text-accent" />
                <span className="text-accent">job_id</span>
                <span className="text-muted-foreground ml-auto">VARCHAR(50) FK</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">peak_cpu_usage</span>
                <span className="text-muted-foreground ml-auto">INTEGER</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">memory_usage_mb</span>
                <span className="text-muted-foreground ml-auto">INTEGER</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">created_at</span>
                <span className="text-muted-foreground ml-auto">TIMESTAMP</span>
              </div>
            </div>
            
            {/* Relationship */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-xs">
                <Link2 className="h-3 w-3 text-accent" />
                <span className="font-mono text-muted-foreground">
                  JobMetrics.job_id → Job.id (One-to-One)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Design Notes */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground font-semibold">Design Note:</span> The schema separates 
            operational state (Job table) from resource metrics (JobMetrics table) for efficient 
            querying. Status updates are frequent during processing, while metrics are written 
            only once upon completion.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
