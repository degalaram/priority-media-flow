import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Send, Search } from "lucide-react";

export const ApiDocumentation = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <Code className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="font-mono text-xl">API Documentation</CardTitle>
            <CardDescription className="font-mono text-xs">
              REST API Endpoints - Django REST Framework
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="submit" className="font-mono text-xs">
              <Send className="h-3 w-3 mr-2" />
              POST /submit_job
            </TabsTrigger>
            <TabsTrigger value="status" className="font-mono text-xs">
              <Search className="h-3 w-3 mr-2" />
              GET /job/{'{id}'}/status
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit" className="space-y-4 mt-4">
            {/* Endpoint Info */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-success/20 text-success font-mono text-xs font-bold">
                POST
              </span>
              <span className="font-mono text-sm text-foreground">
                /api/v1/submit_job
              </span>
            </div>
            
            <p className="font-mono text-xs text-muted-foreground">
              Submit a new media processing job. The job is instantly persisted and routed 
              to the appropriate priority queue.
            </p>
            
            {/* Request */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground font-semibold">
                Request Body
              </span>
              <pre className="p-4 rounded-lg bg-background/80 border border-border/50 overflow-x-auto">
                <code className="font-mono text-xs text-foreground">
{`{
  "source_file": "sample.mp4",
  "target_format": "avi",
  "priority": "high"  // "high" | "low"
}`}
                </code>
              </pre>
            </div>
            
            {/* Response */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground font-semibold">
                Response (201 Created)
              </span>
              <pre className="p-4 rounded-lg bg-background/80 border border-border/50 overflow-x-auto">
                <code className="font-mono text-xs text-foreground">
{`{
  "job_id": "job_1703567890_abc123def",
  "status": "PENDING",
  "priority": "high",
  "source_file": "sample.mp4",
  "target_format": "avi",
  "created_at": "2024-12-26T10:30:00Z",
  "queued_at": null,
  "started_at": null,
  "completed_at": null,
  "message": "Job submitted successfully"
}`}
                </code>
              </pre>
            </div>
            
            {/* Behavior */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-mono text-xs text-foreground font-semibold block mb-2">
                Behavior
              </span>
              <ul className="font-mono text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Validates required fields (source_file, target_format, priority)</li>
                <li>Creates job record with PENDING status</li>
                <li>Transitions to QUEUED and routes to Celery queue</li>
                <li>Returns job_id for status tracking</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="space-y-4 mt-4">
            {/* Endpoint Info */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-primary/20 text-primary font-mono text-xs font-bold">
                GET
              </span>
              <span className="font-mono text-sm text-foreground">
                /api/v1/job/{'{id}'}/status
              </span>
            </div>
            
            <p className="font-mono text-xs text-muted-foreground">
              Retrieve the current state and resource trace for a specific job.
            </p>
            
            {/* Path Parameters */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground font-semibold">
                Path Parameters
              </span>
              <div className="p-3 rounded-lg bg-background/80 border border-border/50">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-primary">id</span>
                  <span className="text-muted-foreground">string (required)</span>
                  <span className="text-muted-foreground/70">- Job identifier</span>
                </div>
              </div>
            </div>
            
            {/* Response - In Progress */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground font-semibold">
                Response (200 OK) - In Progress
              </span>
              <pre className="p-4 rounded-lg bg-background/80 border border-border/50 overflow-x-auto">
                <code className="font-mono text-xs text-foreground">
{`{
  "job_id": "job_1703567890_abc123def",
  "status": "IN_PROGRESS",
  "priority": "high",
  "source_file": "sample.mp4",
  "target_format": "avi",
  "queued_at": "2024-12-26T10:30:01Z",
  "started_at": "2024-12-26T10:30:02Z",
  "completed_at": null,
  "metrics": null
}`}
                </code>
              </pre>
            </div>
            
            {/* Response - Completed */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground font-semibold">
                Response (200 OK) - Completed with Metrics
              </span>
              <pre className="p-4 rounded-lg bg-background/80 border border-border/50 overflow-x-auto">
                <code className="font-mono text-xs text-foreground">
{`{
  "job_id": "job_1703567890_abc123def",
  "status": "COMPLETED",
  "priority": "high",
  "source_file": "sample.mp4",
  "target_format": "avi",
  "queued_at": "2024-12-26T10:30:01Z",
  "started_at": "2024-12-26T10:30:02Z",
  "completed_at": "2024-12-26T10:30:09Z",
  "metrics": {
    "peak_cpu_usage": 75,
    "memory_usage_mb": 512
  }
}`}
                </code>
              </pre>
            </div>
            
            {/* 404 Response */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground font-semibold">
                Response (404 Not Found)
              </span>
              <pre className="p-4 rounded-lg bg-background/80 border border-destructive/30 overflow-x-auto">
                <code className="font-mono text-xs text-foreground">
{`{
  "error": "Job not found",
  "job_id": "invalid_job_id"
}`}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
