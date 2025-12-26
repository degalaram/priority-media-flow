# Celery Tasks for Job Processing

import time
import random
from celery import shared_task
from django.utils import timezone
from .models import Job, JobMetrics


def simulate_processing(job_id, duration_range):
    """
    Simulates media processing work
    Updates job status and records metrics upon completion
    """
    try:
        job = Job.objects.get(id=job_id)
        
        # Update status to IN_PROGRESS
        job.status = 'IN_PROGRESS'
        job.started_at = timezone.now()
        job.save()
        
        # Simulate computational work (several seconds)
        processing_time = random.uniform(*duration_range)
        time.sleep(processing_time)
        
        # Simulate resource metrics
        peak_cpu = random.randint(45, 95)
        memory_mb = random.randint(256, 1024)
        
        # Update job to COMPLETED
        job.status = 'COMPLETED'
        job.completed_at = timezone.now()
        job.save()
        
        # Create metrics record
        JobMetrics.objects.create(
            job=job,
            peak_cpu_usage=peak_cpu,
            memory_usage_mb=memory_mb
        )
        
        return {
            'job_id': job_id,
            'status': 'COMPLETED',
            'processing_time': processing_time,
            'peak_cpu': peak_cpu,
            'memory_mb': memory_mb
        }
        
    except Job.DoesNotExist:
        return {'error': f'Job {job_id} not found'}
    except Exception as e:
        # Mark job as failed
        job = Job.objects.get(id=job_id)
        job.status = 'FAILED'
        job.completed_at = timezone.now()
        job.save()
        return {'error': str(e)}


@shared_task(name='apps.jobs.tasks.process_high_priority_job')
def process_high_priority_job(job_id):
    """
    Process high priority jobs
    Faster processing time: 3-5 seconds
    """
    return simulate_processing(job_id, (3, 5))


@shared_task(name='apps.jobs.tasks.process_low_priority_job')
def process_low_priority_job(job_id):
    """
    Process low priority jobs
    Standard processing time: 5-10 seconds
    """
    return simulate_processing(job_id, (5, 10))
