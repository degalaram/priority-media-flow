import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, ArrowRight, ArrowDown, Database, Server, Layers, Cpu, Zap, Clock } from "lucide-react";

export const ArchitectureDiagram = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-mono text-xl">System Architecture</CardTitle>
            <CardDescription className="font-mono text-xs">
              How the Priority Media Processor Works
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Simple Architecture Flow */}
        <div className="p-6 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Client */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <span className="font-mono text-sm text-foreground font-semibold">Client</span>
              <span className="font-mono text-[11px] text-muted-foreground">Sends job request</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            
            {/* Django API */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <Layers className="h-8 w-8 text-success" />
              </div>
              <span className="font-mono text-sm text-foreground font-semibold">Django API</span>
              <span className="font-mono text-[11px] text-muted-foreground">Validates & saves job</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            
            {/* Redis Broker */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <Database className="h-8 w-8 text-destructive" />
              </div>
              <span className="font-mono text-sm text-foreground font-semibold">Redis</span>
              <span className="font-mono text-[11px] text-muted-foreground">Message queue</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            
            {/* Celery Workers */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex gap-2">
                <div className="p-3 rounded-lg bg-high-priority/10 border border-high-priority/30">
                  <Cpu className="h-6 w-6 text-high-priority" />
                </div>
                <div className="p-3 rounded-lg bg-low-priority/10 border border-low-priority/30">
                  <Cpu className="h-6 w-6 text-low-priority" />
                </div>
              </div>
              <span className="font-mono text-sm text-foreground font-semibold">Celery Workers</span>
              <span className="font-mono text-[11px] text-muted-foreground">Process jobs</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            
            {/* PostgreSQL */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                <Database className="h-8 w-8 text-accent" />
              </div>
              <span className="font-mono text-sm text-foreground font-semibold">PostgreSQL</span>
              <span className="font-mono text-[11px] text-muted-foreground">Stores results</span>
            </div>
          </div>
        </div>
        
        {/* Priority Queues - Clean Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* High Priority Queue */}
          <div className="p-5 rounded-lg bg-high-priority/5 border border-high-priority/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-high-priority/20">
                <Zap className="h-5 w-5 text-high-priority" />
              </div>
              <div>
                <span className="font-mono text-sm font-semibold text-high-priority block">
                  High Priority Queue
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Fast processing for urgent jobs
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="font-mono text-xs text-muted-foreground">Workers</span>
                <span className="font-mono text-xs text-foreground font-medium">4 concurrent</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="font-mono text-xs text-muted-foreground">Queue Delay</span>
                <span className="font-mono text-xs text-foreground font-medium">0.5 - 1 second</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-mono text-xs text-muted-foreground">Processing Time</span>
                <span className="font-mono text-xs text-foreground font-medium">3 - 5 seconds</span>
              </div>
            </div>
          </div>
          
          {/* Low Priority Queue */}
          <div className="p-5 rounded-lg bg-low-priority/5 border border-low-priority/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-low-priority/20">
                <Clock className="h-5 w-5 text-low-priority" />
              </div>
              <div>
                <span className="font-mono text-sm font-semibold text-low-priority block">
                  Low Priority Queue
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Standard processing for regular jobs
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="font-mono text-xs text-muted-foreground">Workers</span>
                <span className="font-mono text-xs text-foreground font-medium">2 concurrent</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="font-mono text-xs text-muted-foreground">Queue Delay</span>
                <span className="font-mono text-xs text-foreground font-medium">1 - 3 seconds</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-mono text-xs text-muted-foreground">Processing Time</span>
                <span className="font-mono text-xs text-foreground font-medium">5 - 10 seconds</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* How Priority Routing Works */}
        <div className="p-5 rounded-lg bg-muted/30 border border-border/50">
          <span className="font-mono text-sm text-foreground font-semibold block mb-4">
            How Priority Routing Works
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-mono text-xs font-bold shrink-0">
                1
              </div>
              <div>
                <span className="font-mono text-xs text-foreground font-medium block">Job Submitted</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  User submits job with priority level (high or low)
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-mono text-xs font-bold shrink-0">
                2
              </div>
              <div>
                <span className="font-mono text-xs text-foreground font-medium block">Queue Selection</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  System routes job to matching priority queue
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-mono text-xs font-bold shrink-0">
                3
              </div>
              <div>
                <span className="font-mono text-xs text-foreground font-medium block">Worker Picks Up</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Dedicated worker processes the job
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
