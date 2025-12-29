# Database Models for Job and JobMetrics

from django.db import models
import uuid


class Job(models.Model):
    """
    Job Table - Stores operational state
    Tracks job through lifecycle: PENDING -> QUEUED -> IN_PROGRESS -> COMPLETED/FAILED
    
    Schema:
    - id: VARCHAR(50) Primary Key
    - source_file: VARCHAR(255) Input file name
    - target_format: VARCHAR(50) Output format
    - priority: ENUM('high', 'low')
    - status: ENUM(PENDING, QUEUED, IN_PROGRESS, COMPLETED, FAILED)
    - error_message: TEXT (optional, for FAILED jobs)
    - created_at: TIMESTAMP
    - queued_at: TIMESTAMP
    - started_at: TIMESTAMP
    - completed_at: TIMESTAMP
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
    source_file = models.CharField(max_length=255, help_text="Simulated input file name")
    target_format = models.CharField(max_length=50, help_text="Target output format")
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, help_text="Job priority level")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    error_message = models.TextField(null=True, blank=True, help_text="Error details if job failed")
    
    # Lifecycle timestamps - recorded at each state transition
    created_at = models.DateTimeField(auto_now_add=True)
    queued_at = models.DateTimeField(null=True, blank=True, help_text="When job was added to queue")
    started_at = models.DateTimeField(null=True, blank=True, help_text="When worker started processing")
    completed_at = models.DateTimeField(null=True, blank=True, help_text="When processing finished")
    
    class Meta:
        db_table = 'jobs'
        ordering = ['-created_at']
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'
    
    def __str__(self):
        return f"Job {self.id} - {self.status}"


class JobMetrics(models.Model):
    """
    JobMetrics Table - Stores resource usage
    Written only once upon job completion (separates operational state from metrics)
    
    Schema:
    - id: VARCHAR(50) Primary Key
    - job_id: VARCHAR(50) Foreign Key to Job
    - peak_cpu_usage: INTEGER (percentage 0-100)
    - memory_usage_mb: INTEGER (MB)
    - processing_time_seconds: FLOAT
    - created_at: TIMESTAMP
    """
    
    id = models.CharField(max_length=50, primary_key=True, default=uuid.uuid4)
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='metrics')
    peak_cpu_usage = models.IntegerField(help_text="Peak CPU usage percentage (0-100)")
    memory_usage_mb = models.IntegerField(help_text="Memory usage in megabytes")
    processing_time_seconds = models.FloatField(default=0, help_text="Total processing time in seconds")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'job_metrics'
        verbose_name = 'Job Metrics'
        verbose_name_plural = 'Job Metrics'
    
    def __str__(self):
        return f"Metrics for Job {self.job_id}"
