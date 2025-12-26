import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, ArrowRight, Database, Server, Layers, Cpu } from "lucide-react";

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
              Celery Multi-Queue Configuration
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Architecture Flow */}
        <div className="p-6 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Client */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <span className="font-mono text-xs text-foreground font-semibold">Client</span>
              <span className="font-mono text-[10px] text-muted-foreground">REST API Call</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <div className="h-6 w-px bg-muted-foreground/30 lg:hidden" />
            
            {/* Django API */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <Layers className="h-8 w-8 text-success" />
              </div>
              <span className="font-mono text-xs text-foreground font-semibold">Django API</span>
              <span className="font-mono text-[10px] text-muted-foreground">DRF ViewSet</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <div className="h-6 w-px bg-muted-foreground/30 lg:hidden" />
            
            {/* Redis Broker */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <Database className="h-8 w-8 text-destructive" />
              </div>
              <span className="font-mono text-xs text-foreground font-semibold">Redis</span>
              <span className="font-mono text-[10px] text-muted-foreground">Message Broker</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <div className="h-6 w-px bg-muted-foreground/30 lg:hidden" />
            
            {/* Celery Workers */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <div className="p-3 rounded-lg bg-high-priority/10 border border-high-priority/30">
                  <Cpu className="h-6 w-6 text-high-priority" />
                </div>
                <div className="p-3 rounded-lg bg-low-priority/10 border border-low-priority/30">
                  <Cpu className="h-6 w-6 text-low-priority" />
                </div>
              </div>
              <span className="font-mono text-xs text-foreground font-semibold">Celery Workers</span>
              <span className="font-mono text-[10px] text-muted-foreground">2 Dedicated Queues</span>
            </div>
            
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
            <div className="h-6 w-px bg-muted-foreground/30 lg:hidden" />
            
            {/* PostgreSQL */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                <Database className="h-8 w-8 text-accent" />
              </div>
              <span className="font-mono text-xs text-foreground font-semibold">PostgreSQL</span>
              <span className="font-mono text-[10px] text-muted-foreground">Persistence</span>
            </div>
          </div>
        </div>
        
        {/* Celery Queue Config */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* High Priority Worker */}
          <div className="p-4 rounded-lg bg-high-priority/5 border border-high-priority/20">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-4 w-4 text-high-priority" />
              <span className="font-mono text-sm font-semibold text-high-priority">
                Worker 1: high_priority
              </span>
            </div>
            <pre className="p-3 rounded bg-background/50 overflow-x-auto">
              <code className="font-mono text-[10px] text-muted-foreground">
{`celery -A config worker \\
  --queues=high_priority \\
  --concurrency=4 \\
  --loglevel=info`}
              </code>
            </pre>
          </div>
          
          {/* Low Priority Worker */}
          <div className="p-4 rounded-lg bg-low-priority/5 border border-low-priority/20">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-4 w-4 text-low-priority" />
              <span className="font-mono text-sm font-semibold text-low-priority">
                Worker 2: low_priority
              </span>
            </div>
            <pre className="p-3 rounded bg-background/50 overflow-x-auto">
              <code className="font-mono text-[10px] text-muted-foreground">
{`celery -A config worker \\
  --queues=low_priority \\
  --concurrency=2 \\
  --loglevel=info`}
              </code>
            </pre>
          </div>
        </div>
        
        {/* Task Routing Config */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <span className="font-mono text-xs text-foreground font-semibold block mb-3">
            Celery Task Routing (config/celery.py)
          </span>
          <pre className="p-3 rounded bg-background/50 overflow-x-auto">
            <code className="font-mono text-[10px] text-foreground">
{`# Task routing based on priority
CELERY_TASK_ROUTES = {
    'apps.jobs.tasks.process_high_priority': {
        'queue': 'high_priority'
    },
    'apps.jobs.tasks.process_low_priority': {
        'queue': 'low_priority'
    },
}

# Or dynamic routing in views.py:
def submit_job(request):
    queue = 'high_priority' if priority == 'high' else 'low_priority'
    process_job.apply_async(args=[job.id], queue=queue)`}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
