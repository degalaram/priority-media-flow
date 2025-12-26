# Database Models for Job and JobMetrics

from django.db import models
import uuid

class Job(models.Model):
    """
    Job Table - Stores operational state
    Tracks job through lifecycle: PENDING -> QUEUED -> IN_PROGRESS -> COMPLETED/FAILED
    """
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('QUEUED', 'Queued'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]
    
    PRIORITY_CHOICES = [
        ('high', 'High Priority'),
        ('low', 'Low Priority'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True, default=uuid.uuid4)
    source_file = models.CharField(max_length=255)
    target_format = models.CharField(max_length=50)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    
    # Lifecycle timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    queued_at = models.DateTimeField(null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'jobs'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Job {self.id} - {self.status}"


class JobMetrics(models.Model):
    """
    JobMetrics Table - Stores resource usage
    Written only once upon job completion
    """
    
    id = models.CharField(max_length=50, primary_key=True, default=uuid.uuid4)
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='metrics')
    peak_cpu_usage = models.IntegerField(help_text="Peak CPU usage percentage")
    memory_usage_mb = models.IntegerField(help_text="Memory usage in MB")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'job_metrics'
    
    def __str__(self):
        return f"Metrics for Job {self.job_id}"
