# Celery Tasks for Job Processing
# These tasks are routed to separate queues based on priority

import time
import random
from celery import shared_task
from django.utils import timezone
from .models import Job, JobMetrics


def simulate_processing(job_id, duration_range):
    """
    Simulates media processing work.
    
    This function:
    1. Updates job status to IN_PROGRESS with started_at timestamp
    2. Simulates computational work for several seconds
    3. Updates job status to COMPLETED with completed_at timestamp
    4. Persists resource metrics to separate JobMetrics table
    
    Args:
        job_id: UUID of the job to process
        duration_range: Tuple of (min_seconds, max_seconds) for simulation
    
    Returns:
        dict: Processing result with status and metrics
    """
    try:
        job = Job.objects.get(id=job_id)
        
        # Update status to IN_PROGRESS and record start timestamp
        job.status = 'IN_PROGRESS'
        job.started_at = timezone.now()
        job.save()
        
        # Simulate computational work (occupies worker for several seconds)
        processing_time = random.uniform(*duration_range)
        time.sleep(processing_time)
        
        # Simulate resource consumption metrics
        peak_cpu = random.randint(45, 95)  # CPU percentage
        memory_mb = random.randint(256, 1024)  # Memory in MB
        
        # Update job to COMPLETED and record completion timestamp
        job.status = 'COMPLETED'
        job.completed_at = timezone.now()
        job.save()
        
        # Persist final resource metrics to separate table
        # This separation ensures clean data modeling
        JobMetrics.objects.create(
            job=job,
            peak_cpu_usage=peak_cpu,
            memory_usage_mb=memory_mb,
            processing_time_seconds=round(processing_time, 2)
        )
        
        return {
            'job_id': job_id,
            'status': 'COMPLETED',
            'processing_time_seconds': round(processing_time, 2),
            'peak_cpu_usage': peak_cpu,
            'memory_usage_mb': memory_mb
        }
        
    except Job.DoesNotExist:
        return {'error': f'Job {job_id} not found', 'status': 'FAILED'}
    except Exception as e:
        # Mark job as FAILED and record error message
        try:
            job = Job.objects.get(id=job_id)
            job.status = 'FAILED'
            job.completed_at = timezone.now()
            job.error_message = str(e)
            job.save()
        except Job.DoesNotExist:
            pass
        return {'error': str(e), 'status': 'FAILED'}


@shared_task(name='apps.jobs.tasks.process_high_priority_job')
def process_high_priority_job(job_id):
    """
    Process high priority jobs.
    
    Queue: high_priority
    Concurrency: 4 workers
    Processing time: 3-5 seconds (faster)
    """
    return simulate_processing(job_id, (3, 5))


@shared_task(name='apps.jobs.tasks.process_low_priority_job')
def process_low_priority_job(job_id):
    """
    Process low priority jobs.
    
    Queue: low_priority
    Concurrency: 2 workers
    Processing time: 5-10 seconds (standard)
    """
    return simulate_processing(job_id, (5, 10))
