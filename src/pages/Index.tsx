import { Header } from "@/components/Header";
import { SubmitJobForm } from "@/components/SubmitJobForm";
import { Terminal, Server, Layers, Cpu } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-3 sm:space-y-4 py-4 sm:py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-4">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs text-primary">Backend Demo Active</span>
          </div>
          
          <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2">
            Priority Media Processor
          </h1>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto px-4">
            A backend system demonstrating asynchronous job processing with priority-based queues,
            lifecycle management, and resource tracking.
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-3 sm:pt-4 px-2">
            {[
              { icon: Terminal, label: "Django" },
              { icon: Server, label: "Celery" },
              { icon: Layers, label: "Redis" },
              { icon: Cpu, label: "PostgreSQL" },
            ].map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-muted/50 border border-border/50"
              >
                <tech.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">{tech.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-accent/10 border border-accent/20">
              <span className="font-mono text-[10px] sm:text-xs text-accent">Mocked in Frontend</span>
            </div>
          </div>
        </section>
        
        {/* Submit Form */}
        <section className="px-0 sm:px-4">
          <SubmitJobForm />
        </section>
        
        {/* Job Lifecycle */}
        <section className="max-w-2xl mx-auto px-2 sm:px-4">
          <div className="p-4 sm:p-6 rounded-lg bg-muted/30 border border-border/50">
            <h3 className="font-mono text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">
              Job Lifecycle
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs">
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-pending/20 text-[hsl(var(--pending))]">PENDING</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-queued/20 text-[hsl(var(--queued))]">QUEUED</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-in-progress/20 text-[hsl(var(--in-progress))]">IN_PROGRESS</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-success/20 text-success">COMPLETED</span>
              <span className="text-muted-foreground">/</span>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-destructive/20 text-destructive">FAILED</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
