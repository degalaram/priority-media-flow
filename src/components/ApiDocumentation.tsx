import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Send, Search, FileText, CheckCircle, ArrowRight } from "lucide-react";

export const ApiDocumentation = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <Code className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="font-mono text-xl">API Endpoints</CardTitle>
            <CardDescription className="font-mono text-xs">
              REST API for Job Management
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="submit" className="font-mono text-xs">
              <Send className="h-3 w-3 mr-2" />
              Submit Job
            </TabsTrigger>
            <TabsTrigger value="status" className="font-mono text-xs">
              <Search className="h-3 w-3 mr-2" />
              Get Status
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit" className="space-y-4 mt-4">
            {/* Endpoint Info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 rounded bg-success/20 text-success font-mono text-xs font-bold">
                POST
              </span>
              <span className="font-mono text-sm text-foreground">
                /api/v1/submit_job
              </span>
            </div>
            
            <p className="font-mono text-xs text-muted-foreground">
              Submit a new media processing job. The job is saved instantly and sent to the right priority queue.
            </p>
            
            {/* Required Fields - Visual Table */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-foreground font-semibold flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Required Fields
              </span>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 p-3 border-b border-border/50">
                  <span className="font-mono text-xs text-muted-foreground font-medium">Field</span>
                  <span className="font-mono text-xs text-muted-foreground font-medium">Type</span>
                  <span className="font-mono text-xs text-muted-foreground font-medium">Description</span>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-primary">source_file</span>
                  <span className="font-mono text-xs text-muted-foreground">String</span>
                  <span className="font-mono text-xs text-foreground">Input file name</span>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-primary">target_format</span>
                  <span className="font-mono text-xs text-muted-foreground">String</span>
                  <span className="font-mono text-xs text-foreground">Output format (mp4, avi, etc.)</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-mono text-xs text-primary">priority</span>
                  <span className="font-mono text-xs text-muted-foreground">String</span>
                  <span className="font-mono text-xs text-foreground">"high" or "low"</span>
                </div>
              </div>
            </div>
            
            {/* Response Fields */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-foreground font-semibold flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-success" />
                Response (201 Created)
              </span>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="grid grid-cols-2 bg-muted/50 p-3 border-b border-border/50">
                  <span className="font-mono text-xs text-muted-foreground font-medium">Field</span>
                  <span className="font-mono text-xs text-muted-foreground font-medium">Description</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">job_id</span>
                  <span className="font-mono text-xs text-muted-foreground">Unique identifier for tracking</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">status</span>
                  <span className="font-mono text-xs text-muted-foreground">Initial status (PENDING)</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">created_at</span>
                  <span className="font-mono text-xs text-muted-foreground">Timestamp when job was created</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-mono text-xs text-foreground">message</span>
                  <span className="font-mono text-xs text-muted-foreground">Success confirmation</span>
                </div>
              </div>
            </div>
            
            {/* Behavior Flow */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-mono text-xs text-foreground font-semibold block mb-3">
                What Happens When You Submit
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-muted text-xs font-mono">Validate Input</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className="px-2 py-1 rounded bg-muted text-xs font-mono">Save to Database</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className="px-2 py-1 rounded bg-muted text-xs font-mono">Add to Queue</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-mono">Return Job ID</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="space-y-4 mt-4">
            {/* Endpoint Info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 rounded bg-primary/20 text-primary font-mono text-xs font-bold">
                GET
              </span>
              <span className="font-mono text-sm text-foreground">
                /api/v1/job/{'{id}'}/status
              </span>
            </div>
            
            <p className="font-mono text-xs text-muted-foreground">
              Get the current status and resource usage for a specific job.
            </p>
            
            {/* Path Parameter */}
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="px-2 py-1 rounded bg-primary/20 text-primary font-medium">id</span>
                <span className="text-muted-foreground">Job identifier returned from submit</span>
              </div>
            </div>
            
            {/* Response Fields */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-foreground font-semibold">
                Response Fields
              </span>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="grid grid-cols-2 bg-muted/50 p-3 border-b border-border/50">
                  <span className="font-mono text-xs text-muted-foreground font-medium">Field</span>
                  <span className="font-mono text-xs text-muted-foreground font-medium">Description</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">status</span>
                  <span className="font-mono text-xs text-muted-foreground">PENDING, QUEUED, IN_PROGRESS, COMPLETED, FAILED</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">priority</span>
                  <span className="font-mono text-xs text-muted-foreground">High or Low</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">queued_at</span>
                  <span className="font-mono text-xs text-muted-foreground">When job entered queue</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">started_at</span>
                  <span className="font-mono text-xs text-muted-foreground">When processing began</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-border/30">
                  <span className="font-mono text-xs text-foreground">completed_at</span>
                  <span className="font-mono text-xs text-muted-foreground">When processing finished</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-mono text-xs text-foreground">metrics</span>
                  <span className="font-mono text-xs text-muted-foreground">CPU and memory usage (when complete)</span>
                </div>
              </div>
            </div>
            
            {/* Status Values */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-mono text-xs text-foreground font-semibold block mb-3">
                Job Status Values
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-muted-foreground/20 text-xs font-mono">PENDING</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground self-center" />
                <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">QUEUED</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground self-center" />
                <span className="px-2 py-1 rounded bg-warning/20 text-warning text-xs font-mono">IN_PROGRESS</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground self-center" />
                <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-mono">COMPLETED</span>
              </div>
            </div>
            
            {/* Resource Metrics */}
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <span className="font-mono text-xs text-foreground font-semibold block mb-3">
                Resource Metrics (Available when completed)
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-high-priority"></div>
                  <span className="font-mono text-xs text-muted-foreground">Peak CPU Usage (%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-low-priority"></div>
                  <span className="font-mono text-xs text-muted-foreground">Memory Usage (MB)</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
