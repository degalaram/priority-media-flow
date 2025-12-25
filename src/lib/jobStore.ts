// Mock backend store - simulates Django + Celery + PostgreSQL
export type JobStatus = 'PENDING' | 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type Priority = 'high' | 'low';

export interface JobMetrics {
  id: string;
  jobId: string;
  peakCpuUsage: number;
  memoryUsageMb: number;
  createdAt: Date;
}

export interface Job {
  id: string;
  sourceFile: string;
  targetFormat: string;
  priority: Priority;
  status: JobStatus;
  createdAt: Date;
  queuedAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  metrics: JobMetrics | null;
}

// Simulated database
let jobs: Job[] = [];
let jobMetrics: JobMetrics[] = [];

// Queue simulation
const highPriorityQueue: string[] = [];
const lowPriorityQueue: string[] = [];

// Generate unique ID
const generateId = () => `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Simulate Celery worker processing
const simulateWorker = (jobId: string) => {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  // Simulate queue delay (high priority gets processed faster)
  const queueDelay = job.priority === 'high' ? 1000 : 2500;
  
  setTimeout(() => {
    // Move to IN_PROGRESS
    job.status = 'IN_PROGRESS';
    job.startedAt = new Date();
    
    // Simulate processing time (5-10 seconds as per spec)
    const processingTime = 5000 + Math.random() * 5000;
    
    setTimeout(() => {
      // 95% success rate for demo
      const isSuccess = Math.random() > 0.05;
      
      if (isSuccess) {
        job.status = 'COMPLETED';
        job.completedAt = new Date();
        
        // Generate fake metrics
        const metrics: JobMetrics = {
          id: `metric_${Date.now()}`,
          jobId: job.id,
          peakCpuUsage: Math.round(20 + Math.random() * 70),
          memoryUsageMb: Math.round(128 + Math.random() * 896),
          createdAt: new Date(),
        };
        
        jobMetrics.push(metrics);
        job.metrics = metrics;
      } else {
        job.status = 'FAILED';
        job.completedAt = new Date();
      }
    }, processingTime);
  }, queueDelay);
};

// API: POST /api/v1/submit_job
export const submitJob = (sourceFile: string, targetFormat: string, priority: Priority): Job => {
  const job: Job = {
    id: generateId(),
    sourceFile,
    targetFormat,
    priority,
    status: 'PENDING',
    createdAt: new Date(),
    queuedAt: null,
    startedAt: null,
    completedAt: null,
    metrics: null,
  };
  
  jobs.push(job);
  
  // Transition to QUEUED
  setTimeout(() => {
    job.status = 'QUEUED';
    job.queuedAt = new Date();
    
    // Route to priority queue
    if (priority === 'high') {
      highPriorityQueue.push(job.id);
    } else {
      lowPriorityQueue.push(job.id);
    }
    
    // Start worker simulation
    simulateWorker(job.id);
  }, 500);
  
  return job;
};

// API: GET /api/v1/job/{id}/status
export const getJobStatus = (jobId: string): Job | null => {
  return jobs.find(j => j.id === jobId) || null;
};

// API: GET all jobs (for dashboard)
export const getAllJobs = (): Job[] => {
  return [...jobs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Get queue stats
export const getQueueStats = () => ({
  highPriorityCount: jobs.filter(j => j.priority === 'high' && ['PENDING', 'QUEUED', 'IN_PROGRESS'].includes(j.status)).length,
  lowPriorityCount: jobs.filter(j => j.priority === 'low' && ['PENDING', 'QUEUED', 'IN_PROGRESS'].includes(j.status)).length,
  completedCount: jobs.filter(j => j.status === 'COMPLETED').length,
  failedCount: jobs.filter(j => j.status === 'FAILED').length,
  totalCount: jobs.length,
});

// Clear all jobs (for demo reset)
export const clearAllJobs = () => {
  jobs = [];
  jobMetrics = [];
};
