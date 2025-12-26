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
                Job Table
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                (Stores Job Details)
              </span>
            </div>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-primary/20">
                <Key className="h-3 w-3 text-primary" />
                <span className="text-primary font-semibold">ID</span>
                <span className="text-muted-foreground ml-auto">Primary Key</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Source File</span>
                <span className="text-muted-foreground ml-auto">Text</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Target Format</span>
                <span className="text-muted-foreground ml-auto">Text</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Priority</span>
                <span className="text-muted-foreground ml-auto">High / Low</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Status</span>
                <span className="text-muted-foreground ml-auto">Job State</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Created At</span>
                <span className="text-muted-foreground ml-auto">Timestamp</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Queued At</span>
                <span className="text-muted-foreground ml-auto">Timestamp</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Started At</span>
                <span className="text-muted-foreground ml-auto">Timestamp</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Completed At</span>
                <span className="text-muted-foreground ml-auto">Timestamp</span>
              </div>
            </div>
          </div>
          
          {/* JobMetrics Table */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-accent" />
              <span className="font-mono text-sm font-semibold text-foreground">
                Job Metrics Table
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                (Resource Usage)
              </span>
            </div>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-primary/20">
                <Key className="h-3 w-3 text-primary" />
                <span className="text-primary font-semibold">ID</span>
                <span className="text-muted-foreground ml-auto">Primary Key</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-accent/20">
                <Link2 className="h-3 w-3 text-accent" />
                <span className="text-accent">Job ID</span>
                <span className="text-muted-foreground ml-auto">Links to Job</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Peak CPU Usage</span>
                <span className="text-muted-foreground ml-auto">Percentage</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Memory Usage</span>
                <span className="text-muted-foreground ml-auto">Megabytes</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                <span className="w-3" />
                <span className="text-foreground">Created At</span>
                <span className="text-muted-foreground ml-auto">Timestamp</span>
              </div>
            </div>
            
            {/* Relationship */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-xs">
                <Link2 className="h-3 w-3 text-accent" />
                <span className="font-mono text-muted-foreground">
                  One Job has One Metrics Record
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Design Notes */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground font-semibold">Design Note:</span> The schema separates 
            job state from resource metrics for efficient querying. Status updates happen frequently 
            during processing, while metrics are saved only once when the job completes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
