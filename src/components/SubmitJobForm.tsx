import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitJob, type Priority } from "@/lib/jobStore";
import { useToast } from "@/hooks/use-toast";
import { Send, FileVideo, ArrowRightLeft, Zap, Copy, Check } from "lucide-react";

export const SubmitJobForm = () => {
  const [sourceFile, setSourceFile] = useState("");
  const [targetFormat, setTargetFormat] = useState("");
  const [priority, setPriority] = useState<Priority>("high");
  const [submittedJobId, setSubmittedJobId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sourceFile.trim() || !targetFormat.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const job = submitJob(sourceFile.trim(), targetFormat.trim(), priority);
    
    setSubmittedJobId(job.id);
    setIsSubmitting(false);
    
    toast({
      title: "Job Submitted Successfully",
      description: `Job ${job.id} has been queued for processing`,
    });
    
    // Reset form
    setSourceFile("");
    setTargetFormat("");
    setPriority("high");
  };

  const copyJobId = async () => {
    if (submittedJobId) {
      await navigator.clipboard.writeText(submittedJobId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-mono text-xl">Submit Processing Job</CardTitle>
              <CardDescription className="font-mono text-xs">
                POST /api/v1/submit_job
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sourceFile" className="font-mono text-sm flex items-center gap-2">
                <FileVideo className="h-4 w-4 text-muted-foreground" />
                Source File
              </Label>
              <Input
                id="sourceFile"
                type="text"
                placeholder="example.mp4"
                value={sourceFile}
                onChange={(e) => setSourceFile(e.target.value)}
                className="font-mono bg-muted/50 border-border/50 focus:border-primary/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetFormat" className="font-mono text-sm flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                Target Format
              </Label>
              <Input
                id="targetFormat"
                type="text"
                placeholder="avi"
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="font-mono bg-muted/50 border-border/50 focus:border-primary/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="font-mono text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                Priority Queue
              </Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="font-mono bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="high" className="font-mono">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      High Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="low" className="font-mono">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Low Priority
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-mono bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Job
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {submittedJobId && (
        <Card className="border-success/30 bg-success/5 animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Job ID
                </p>
                <p className="font-mono text-sm text-success break-all">
                  {submittedJobId}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={copyJobId}
                className="shrink-0 border-success/30 hover:bg-success/10"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4 text-success" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
