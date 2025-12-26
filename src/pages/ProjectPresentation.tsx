import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Layers, 
  Database, 
  Server, 
  Workflow, 
  CheckCircle2, 
  Lightbulb,
  Rocket,
  Code,
  Clock,
  Zap,
  Users,
  BarChart3,
  Shield,
  ArrowRight
} from "lucide-react";

const ProjectPresentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 md:py-8">
        {/* Title Slide */}
        <div className="text-center mb-8 md:mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Project Documentation
          </Badge>
          <h1 className="font-mono text-2xl md:text-4xl font-bold text-foreground mb-4">
            Priority Media Processor
          </h1>
          <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A Complete Backend System for Asynchronous Media Processing
          </p>
        </div>

        {/* Slides Container */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Slide 1: Project Overview */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 1</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  Project Overview & Main Goal
                </h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
                <h3 className="font-mono font-semibold text-primary mb-2">Main Motto</h3>
                <p className="font-mono text-sm md:text-base text-foreground">
                  "Build a robust backend system that handles media processing jobs efficiently 
                  using priority-based task queuing"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Zap className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <h4 className="font-mono font-semibold text-sm">Fast Processing</h4>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    High priority jobs processed first
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-mono font-semibold text-sm">Real-time Tracking</h4>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    Monitor job status and progress
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-mono font-semibold text-sm">Resource Metrics</h4>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    Track CPU and memory usage
                  </p>
                </div>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-mono text-sm text-muted-foreground">
                  <strong>Problem Statement:</strong> Media processing is resource-intensive. 
                  We need a system that can handle multiple jobs, prioritize urgent tasks, 
                  and provide visibility into the processing pipeline.
                </p>
              </div>
            </div>
          </Card>

          {/* Slide 2: Technology Stack */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 2</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  Technology Stack
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Backend Technologies */}
              <div className="space-y-4">
                <h3 className="font-mono font-semibold text-foreground flex items-center gap-2">
                  <Server className="w-4 h-4" /> Backend Technologies
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-white font-bold text-xs">
                        Dj
                      </div>
                      <span className="font-mono font-semibold">Django</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Python web framework for building the REST API
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white font-bold text-xs">
                        Ce
                      </div>
                      <span className="font-mono font-semibold">Celery</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Distributed task queue for background job processing
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-white font-bold text-xs">
                        Re
                      </div>
                      <span className="font-mono font-semibold">Redis</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      In-memory data store used as message broker
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                        Pg
                      </div>
                      <span className="font-mono font-semibold">PostgreSQL</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Relational database for storing jobs and metrics
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Frontend Technologies */}
              <div className="space-y-4">
                <h3 className="font-mono font-semibold text-foreground flex items-center gap-2">
                  <Code className="w-4 h-4" /> Frontend Technologies
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                        Re
                      </div>
                      <span className="font-mono font-semibold">React</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      JavaScript library for building user interfaces
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                        Ts
                      </div>
                      <span className="font-mono font-semibold">TypeScript</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Typed JavaScript for better code quality
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-cyan-400 flex items-center justify-center text-white font-bold text-xs">
                        Tw
                      </div>
                      <span className="font-mono font-semibold">Tailwind CSS</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Utility-first CSS framework for styling
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center text-white font-bold text-xs">
                        Vi
                      </div>
                      <span className="font-mono font-semibold">Vite</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Fast build tool and development server
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Slide 3: System Architecture */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Workflow className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 3</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  System Architecture
                </h2>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Architecture Flow */}
              <div className="bg-muted/30 rounded-lg p-4 md:p-6 overflow-x-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 min-w-max">
                  {/* Client */}
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center min-w-24">
                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <span className="font-mono text-xs font-semibold">Client</span>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />
                  
                  {/* API */}
                  <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 text-center min-w-24">
                    <Server className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <span className="font-mono text-xs font-semibold">Django API</span>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />
                  
                  {/* Redis */}
                  <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-center min-w-24">
                    <Database className="w-6 h-6 text-red-500 mx-auto mb-1" />
                    <span className="font-mono text-xs font-semibold">Redis Broker</span>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />
                  
                  {/* Workers */}
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg p-3 text-center min-w-32">
                    <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                    <span className="font-mono text-xs font-semibold">Celery Workers</span>
                    <div className="flex gap-1 justify-center mt-1">
                      <span className="text-[10px] bg-red-500/30 px-1 rounded">High</span>
                      <span className="text-[10px] bg-blue-500/30 px-1 rounded">Low</span>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />
                  
                  {/* Database */}
                  <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-3 text-center min-w-24">
                    <Database className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <span className="font-mono text-xs font-semibold">PostgreSQL</span>
                  </div>
                </div>
              </div>
              
              {/* How It Works */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-mono font-semibold text-sm mb-3">Request Flow</h4>
                  <ol className="space-y-2 font-mono text-xs text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
                      <span>Client sends job request to API</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
                      <span>API saves job to PostgreSQL</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                      <span>Task sent to Redis queue</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">4</span>
                      <span>Worker picks task from queue</span>
                    </li>
                  </ol>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-mono font-semibold text-sm mb-3">Priority Queues</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="font-mono text-xs">
                        <strong>High Priority:</strong> Faster processing, 4 workers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="font-mono text-xs">
                        <strong>Low Priority:</strong> Normal processing, 2 workers
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mt-2">
                      High priority jobs are always processed before low priority ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Slide 4: Database Design */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Database className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 4</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  Database Design
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Table */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-mono font-semibold text-sm mb-4 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs">Table</span>
                  Job
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>id</strong></span>
                    <span className="text-muted-foreground">UUID (Primary Key)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>source_file</strong></span>
                    <span className="text-muted-foreground">VARCHAR(255)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>target_format</strong></span>
                    <span className="text-muted-foreground">VARCHAR(50)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>priority</strong></span>
                    <span className="text-muted-foreground">ENUM (high/low)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>status</strong></span>
                    <span className="text-muted-foreground">ENUM (pending...)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>queued_at</strong></span>
                    <span className="text-muted-foreground">TIMESTAMP</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>started_at</strong></span>
                    <span className="text-muted-foreground">TIMESTAMP</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span><strong>completed_at</strong></span>
                    <span className="text-muted-foreground">TIMESTAMP</span>
                  </div>
                </div>
              </div>
              
              {/* JobMetrics Table */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-mono font-semibold text-sm mb-4 flex items-center gap-2">
                  <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs">Table</span>
                  JobMetrics
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>id</strong></span>
                    <span className="text-muted-foreground">UUID (Primary Key)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>job_id</strong></span>
                    <span className="text-muted-foreground">UUID (Foreign Key)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>peak_cpu_usage</strong></span>
                    <span className="text-muted-foreground">DECIMAL</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span><strong>memory_usage_mb</strong></span>
                    <span className="text-muted-foreground">INTEGER</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span><strong>created_at</strong></span>
                    <span className="text-muted-foreground">TIMESTAMP</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-primary/10 rounded text-xs">
                  <strong>Why separate tables?</strong>
                  <p className="text-muted-foreground mt-1">
                    Metrics data is optional and only available after job completion. 
                    Separating it keeps the Job table clean and fast.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Slide 5: API Endpoints */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Code className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 5</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  API Endpoints
                </h2>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Submit Job */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-green-500/10 px-4 py-2 flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">POST</Badge>
                  <code className="font-mono text-sm">/api/v1/submit_job</code>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-mono text-xs font-semibold mb-2">Request Body</h4>
                    <pre className="bg-muted rounded p-3 text-xs overflow-x-auto">
{`{
  "source_file": "video.mp4",
  "target_format": "webm",
  "priority": "high"
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-semibold mb-2">Response (201)</h4>
                    <pre className="bg-muted rounded p-3 text-xs overflow-x-auto">
{`{
  "job_id": "abc123",
  "status": "pending",
  "queued_at": "2024-01-01..."
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Get Status */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-blue-500/10 px-4 py-2 flex items-center gap-2">
                  <Badge className="bg-blue-500 text-white">GET</Badge>
                  <code className="font-mono text-sm">/api/v1/job/{"{id}"}/status</code>
                </div>
                <div className="p-4">
                  <h4 className="font-mono text-xs font-semibold mb-2">Response (200)</h4>
                  <pre className="bg-muted rounded p-3 text-xs overflow-x-auto">
{`{
  "id": "abc123",
  "status": "completed",
  "priority": "high",
  "queued_at": "2024-01-01T10:00:00Z",
  "started_at": "2024-01-01T10:00:05Z",
  "completed_at": "2024-01-01T10:00:15Z",
  "metrics": {
    "peak_cpu_usage": 78.5,
    "memory_usage_mb": 256
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          {/* Slide 6: Development Steps */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 6</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  Development Steps
                </h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { step: 1, title: "Project Setup", desc: "Initialize Django project with Docker, PostgreSQL, and Redis configuration" },
                { step: 2, title: "Database Models", desc: "Create Job and JobMetrics models with proper relationships and constraints" },
                { step: 3, title: "Celery Configuration", desc: "Set up Celery with Redis broker and configure two priority queues" },
                { step: 4, title: "API Endpoints", desc: "Build REST endpoints for job submission and status retrieval" },
                { step: 5, title: "Worker Logic", desc: "Implement task processing with simulated work and resource tracking" },
                { step: 6, title: "Frontend Dashboard", desc: "Create React UI for job submission, monitoring, and visualization" },
                { step: 7, title: "Testing & Documentation", desc: "Test all components and write comprehensive documentation" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono font-bold text-primary">{item.step}</span>
                  </div>
                  <div className="flex-1 border-b border-border pb-3">
                    <h4 className="font-mono font-semibold text-sm">{item.title}</h4>
                    <p className="font-mono text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Slide 7: Key Features */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 7</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  Key Features & Benefits
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Priority Queuing", desc: "High priority jobs processed 2x faster", color: "text-amber-500" },
                { icon: Clock, title: "Real-time Status", desc: "Track jobs from submission to completion", color: "text-blue-500" },
                { icon: BarChart3, title: "Resource Metrics", desc: "CPU and memory usage tracking", color: "text-green-500" },
                { icon: Database, title: "Persistent Storage", desc: "All job data stored in PostgreSQL", color: "text-purple-500" },
                { icon: Shield, title: "Error Handling", desc: "Failed jobs tracked with error details", color: "text-red-500" },
                { icon: Rocket, title: "Scalable Design", desc: "Add more workers as load increases", color: "text-cyan-500" },
              ].map((feature, idx) => (
                <div key={idx} className="bg-muted/30 rounded-lg p-4 text-center">
                  <feature.icon className={`w-8 h-8 ${feature.color} mx-auto mb-2`} />
                  <h4 className="font-mono font-semibold text-sm">{feature.title}</h4>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Slide 8: Use Cases & Conclusion */}
          <Card className="p-4 md:p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
              </div>
              <div>
                <Badge variant="outline" className="mb-1">Slide 8</Badge>
                <h2 className="font-mono text-lg md:text-xl font-bold text-foreground">
                  Use Cases & Conclusion
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Use Cases */}
              <div>
                <h3 className="font-mono font-semibold text-sm mb-4">Real-World Applications</h3>
                <div className="space-y-3">
                  {[
                    "Video streaming platforms (transcoding)",
                    "Image processing services (resize, compress)",
                    "Document conversion systems (PDF, Office)",
                    "Audio processing (format conversion)",
                    "Data pipeline processing",
                    "Report generation systems"
                  ].map((useCase, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="font-mono text-xs">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              <div>
                <h3 className="font-mono font-semibold text-sm mb-4">Project Summary</h3>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="font-mono text-sm text-foreground mb-4">
                    This project demonstrates a complete backend system for handling 
                    asynchronous media processing with priority-based task management.
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Backend:</span>
                      <span>Django + Celery + Redis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Database:</span>
                      <span>PostgreSQL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frontend:</span>
                      <span>React + TypeScript</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Features:</span>
                      <span>Priority Queues, Metrics</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    ✓ 100% Requirements Completed
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
          
        </div>

        {/* Footer */}
        <div className="text-center mt-8 md:mt-12 py-6 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground">
            Priority Media Processor Backend — Project Documentation
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProjectPresentation;
