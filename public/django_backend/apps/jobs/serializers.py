# Serializers for Job API

from rest_framework import serializers
from .models import Job, JobMetrics


class JobMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobMetrics
        fields = ['peak_cpu_usage', 'memory_usage_mb']


class JobSubmitSerializer(serializers.Serializer):
    """Serializer for job submission"""
    source_file = serializers.CharField(max_length=255)
    target_format = serializers.CharField(max_length=50)
    priority = serializers.ChoiceField(choices=['high', 'low'])


class JobStatusSerializer(serializers.ModelSerializer):
    """Serializer for job status response"""
    metrics = JobMetricsSerializer(read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'source_file', 'target_format', 'priority', 'status',
            'created_at', 'queued_at', 'started_at', 'completed_at', 'metrics'
        ]
