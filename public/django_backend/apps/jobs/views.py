# API Views for Job Submission and Status

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import Job
from .serializers import JobSubmitSerializer, JobStatusSerializer
from .tasks import process_high_priority_job, process_low_priority_job


@api_view(['POST'])
def submit_job(request):
    """
    POST /api/v1/submit_job
    
    Submit a new media processing job.
    Routes to high_priority or low_priority queue based on priority field.
    """
    serializer = JobSubmitSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            {'error': 'Validation failed', 'details': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create job record with PENDING status
    job = Job.objects.create(
        source_file=serializer.validated_data['source_file'],
        target_format=serializer.validated_data['target_format'],
        priority=serializer.validated_data['priority'],
        status='PENDING'
    )
    
    # Update to QUEUED and route to appropriate queue
    job.status = 'QUEUED'
    job.queued_at = timezone.now()
    job.save()
    
    # Route task to correct priority queue
    if job.priority == 'high':
        process_high_priority_job.apply_async(
            args=[str(job.id)],
            queue='high_priority'
        )
    else:
        process_low_priority_job.apply_async(
            args=[str(job.id)],
            queue='low_priority'
        )
    
    return Response({
        'job_id': str(job.id),
        'status': job.status,
        'priority': job.priority,
        'source_file': job.source_file,
        'target_format': job.target_format,
        'created_at': job.created_at,
        'queued_at': job.queued_at,
        'message': 'Job submitted successfully'
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def job_status(request, job_id):
    """
    GET /api/v1/job/{id}/status
    
    Retrieve job status and resource metrics.
    """
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response(
            {'error': 'Job not found', 'job_id': job_id},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = JobStatusSerializer(job)
    return Response(serializer.data)
