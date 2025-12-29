# Serializers for Job API
# Handles validation and response formatting

from rest_framework import serializers
from .models import Job, JobMetrics


class JobMetricsSerializer(serializers.ModelSerializer):
    """Serializer for resource usage metrics"""
    class Meta:
        model = JobMetrics
        fields = ['peak_cpu_usage', 'memory_usage_mb', 'processing_time_seconds']


class JobSubmitSerializer(serializers.Serializer):
    """
    Serializer for job submission (POST /api/v1/submit_job)
    
    Required fields:
    - source_file: Simulated input file name
    - target_format: Desired output format
    - priority: 'high' or 'low'
    """
    source_file = serializers.CharField(
        max_length=255, 
        help_text="Simulated source file name (e.g., 'video.mp4')"
    )
    target_format = serializers.CharField(
        max_length=50,
        help_text="Target format (e.g., 'avi', 'mkv', 'webm')"
    )
    priority = serializers.ChoiceField(
        choices=['high', 'low'],
        help_text="Priority level: 'high' for urgent, 'low' for standard"
    )


class JobStatusSerializer(serializers.ModelSerializer):
    """
    Serializer for job status response (GET /api/v1/job/{id}/status)
    
    Returns:
    - Job operational state (status, priority, timestamps)
    - Resource metrics (if completed)
    - Error message (if failed)
    """
    metrics = JobMetricsSerializer(read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'source_file', 'target_format', 'priority', 'status',
            'error_message', 'created_at', 'queued_at', 'started_at', 
            'completed_at', 'metrics'
        ]
