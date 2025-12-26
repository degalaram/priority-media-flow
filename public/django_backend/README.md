# Priority Media Processor Backend

A Django backend system for asynchronous media processing with priority-based queues.

## Technology Stack

- **Django** - Web framework and REST API
- **Celery** - Distributed task queue
- **Redis** - Message broker
- **PostgreSQL** - Database

## Database Schema

### Job Table (Operational State)
| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(50) | Primary Key |
| source_file | VARCHAR(255) | Input file name |
| target_format | VARCHAR(50) | Output format |
| priority | ENUM | 'high' or 'low' |
| status | ENUM | PENDING, QUEUED, IN_PROGRESS, COMPLETED, FAILED |
| created_at | TIMESTAMP | Job creation time |
| queued_at | TIMESTAMP | When added to queue |
| started_at | TIMESTAMP | Processing start time |
| completed_at | TIMESTAMP | Processing end time |

### JobMetrics Table (Resource Usage)
| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(50) | Primary Key |
| job_id | VARCHAR(50) | Foreign Key to Job |
| peak_cpu_usage | INTEGER | CPU percentage |
| memory_usage_mb | INTEGER | Memory in MB |
| created_at | TIMESTAMP | Record creation time |

## Celery Multi-Queue Configuration

### Two Priority Queues:
1. **high_priority** - 4 concurrent workers, faster processing (3-5 seconds)
2. **low_priority** - 2 concurrent workers, standard processing (5-10 seconds)

### Starting Workers:
```bash
# High priority worker
celery -A config worker --queues=high_priority --concurrency=4 --loglevel=info

# Low priority worker
celery -A config worker --queues=low_priority --concurrency=2 --loglevel=info
```

## API Endpoints

### POST /api/v1/submit_job
Submit a new processing job.

**Request:**
```json
{
  "source_file": "video.mp4",
  "target_format": "avi",
  "priority": "high"
}
```

### GET /api/v1/job/{id}/status
Get job status and metrics.

## Quick Start with Docker

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec web python manage.py migrate

# View logs
docker-compose logs -f
```

## Manual Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DB_HOST=localhost
export DB_NAME=media_processor
export DB_USER=postgres
export DB_PASSWORD=password
export REDIS_URL=redis://localhost:6379/0

# Run migrations
python manage.py migrate

# Start Django server
python manage.py runserver

# Start Celery workers (in separate terminals)
celery -A config worker --queues=high_priority --concurrency=4 --loglevel=info
celery -A config worker --queues=low_priority --concurrency=2 --loglevel=info
```

## Deployment Options

- **Railway** - Easy deployment with Redis and PostgreSQL add-ons
- **Render** - Free tier available
- **Heroku** - Simple with add-ons
- **DigitalOcean App Platform** - Production ready
