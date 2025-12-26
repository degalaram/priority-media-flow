import { Header } from "@/components/Header";
import { JobsTable } from "@/components/JobsTable";
import { QueueStats } from "@/components/QueueStats";
import { QueueVisualization } from "@/components/QueueVisualization";
import { JobLookup } from "@/components/JobLookup";
import { Button } from "@/components/ui/button";
import { clearAllJobs } from "@/lib/jobStore";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  const handleClearJobs = () => {
    clearAllJobs();
    toast({
      title: "Jobs Cleared",
      description: "All jobs have been removed from the database",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-mono text-2xl font-bold text-foreground">
              Job Dashboard
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              Real-time job status and resource metrics
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearJobs}
            className="font-mono text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All Jobs
          </Button>
        </div>
        
        {/* Queue Stats */}
        <QueueStats />
        
        {/* Queue Visualization */}
        <QueueVisualization />
        
        {/* Job Lookup */}
        <JobLookup />
        
        {/* Jobs Table */}
        <JobsTable />
      </main>
    </div>
  );
};

export default Dashboard;
