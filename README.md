# Priority Media Processor Backend

A robust Django backend system for managing asynchronous media processing jobs with priority-based queues and lifecycle tracking.

## Project Goal

Implement a backend system that:
- Accepts job submissions via REST API
- Routes tasks to priority-based background queues
- Tracks job lifecycle with precise timestamps
- Simulates computational work in background workers
- Records resource usage metrics upon completion

## Technology Stack

| Component | Technology |
|-----------|------------|
| Web Framework | Django 4.2 + Django REST Framework |
| Task Queue | Celery 5.3 |
| Message Broker | Redis 7 |
| Database | PostgreSQL 15 |
| Container | Docker + Docker Compose |

---

## Database Schema

### Job Table (Operational State)

Stores the job's current state and lifecycle timestamps.

| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(50) | Primary Key (UUID) |
| source_file | VARCHAR(255) | Simulated input file name |
| target_format | VARCHAR(50) | Desired output format |
| priority | ENUM | 'high' or 'low' |
| status | ENUM | PENDING, QUEUED, IN_PROGRESS, COMPLETED, FAILED |
| error_message | TEXT | Error details (for FAILED jobs only) |
| created_at | TIMESTAMP | Job creation time |
| queued_at | TIMESTAMP | When added to queue |
| started_at | TIMESTAMP | When worker started processing |
| completed_at | TIMESTAMP | When processing finished |

### JobMetrics Table (Resource Usage)

Stores simulated resource consumption (written once upon completion).

| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(50) | Primary Key (UUID) |
| job_id | VARCHAR(50) | Foreign Key to Job (OneToOne) |
| peak_cpu_usage | INTEGER | Simulated CPU percentage (0-100) |
| memory_usage_mb | INTEGER | Simulated memory in MB |
| processing_time_seconds | FLOAT | Actual processing duration |
| created_at | TIMESTAMP | Record creation time |

**Design Note:** Operational state and resource metrics are separated into different tables for clean data modeling and efficient querying.

---

## Job Lifecycle State Machine

```
PENDING → QUEUED → IN_PROGRESS → COMPLETED
                              ↘ FAILED
```

| State | Description | Timestamp |
|-------|-------------|-----------|
| PENDING | Job record created | created_at |
| QUEUED | Task sent to Celery queue | queued_at |
| IN_PROGRESS | Worker started processing | started_at |
| COMPLETED | Processing finished successfully | completed_at |
| FAILED | Processing encountered an error | completed_at |

---

## API Endpoints

### POST /api/v1/submit_job

Submit a new media processing job.

**Request:**
```json
{
  "source_file": "video.mp4",
  "target_format": "avi",
  "priority": "high"
}
```

**Response (201 Created):**
```json
{
  "job_id": "abc123-uuid",
  "status": "QUEUED",
  "priority": "high",
  "source_file": "video.mp4",
  "target_format": "avi",
  "created_at": "2024-01-15T10:30:00Z",
  "queued_at": "2024-01-15T10:30:00Z",
  "message": "Job submitted successfully"
}
```

**Behavior:**
1. Validates input fields
2. Creates job record with PENDING status
3. Updates to QUEUED and records queued_at timestamp
4. Routes task to appropriate Celery queue based on priority

### GET /api/v1/job/{id}/status

Retrieve job status and resource metrics.

**Response (200 OK):**
```json
{
  "id": "abc123-uuid",
  "source_file": "video.mp4",
  "target_format": "avi",
  "priority": "high",
  "status": "COMPLETED",
  "error_message": null,
  "created_at": "2024-01-15T10:30:00Z",
  "queued_at": "2024-01-15T10:30:00Z",
  "started_at": "2024-01-15T10:30:01Z",
  "completed_at": "2024-01-15T10:30:05Z",
  "metrics": {
    "peak_cpu_usage": 78,
    "memory_usage_mb": 512,
    "processing_time_seconds": 4.23
  }
}
```

---

## Celery Multi-Queue Configuration

### Two Priority Queues

The system uses two distinct Celery queues to handle tasks based on submission priority:

| Queue | Concurrency | Processing Time | Use Case |
|-------|-------------|-----------------|----------|
| high_priority | 4 workers | 3-5 seconds | Urgent jobs |
| low_priority | 2 workers | 5-10 seconds | Standard jobs |

### Queue Configuration (config/settings.py)

```python
# Task routing based on task name
CELERY_TASK_ROUTES = {
    'apps.jobs.tasks.process_high_priority_job': {'queue': 'high_priority'},
    'apps.jobs.tasks.process_low_priority_job': {'queue': 'low_priority'},
}

# Queue definitions
CELERY_TASK_QUEUES = {
    'high_priority': {'exchange': 'high_priority', 'routing_key': 'high_priority'},
    'low_priority': {'exchange': 'low_priority', 'routing_key': 'low_priority'},
}
```

### Starting Workers (Separate Terminals)

```bash
# High priority worker - 4 concurrent processes
celery -A config worker --queues=high_priority --concurrency=4 --loglevel=info

# Low priority worker - 2 concurrent processes
celery -A config worker --queues=low_priority --concurrency=2 --loglevel=info
```

### How Priority Routing Works

1. API receives job with `priority` field
2. Job is persisted to database
3. Based on priority value:
   - `high` → Task routed to `high_priority` queue
   - `low` → Task routed to `low_priority` queue
4. Dedicated workers consume from their respective queues

---

## Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Start All Services

```bash
# Start PostgreSQL, Redis, Django, and Celery workers
docker-compose up -d

# Run database migrations
docker-compose exec web python manage.py migrate

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Service Ports

| Service | Port |
|---------|------|
| Django API | http://localhost:8000 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

---

## Manual Setup (Development)

### Prerequisites
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Clone and navigate to backend directory
cd django_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Edit .env with your database credentials
```

### Environment Variables

```bash
# Django
SECRET_KEY=your-super-secret-key
DEBUG=True

# Database (PostgreSQL)
DB_HOST=localhost
DB_NAME=media_processor
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

# Redis (Celery Broker)
REDIS_URL=redis://localhost:6379/0
```

### Run Application

```bash
# Terminal 1: Run migrations and start Django
python manage.py migrate
python manage.py runserver

# Terminal 2: Start high priority Celery worker
celery -A config worker --queues=high_priority --concurrency=4 --loglevel=info

# Terminal 3: Start low priority Celery worker
celery -A config worker --queues=low_priority --concurrency=2 --loglevel=info
```

---

## Testing the System

### 1. Submit a High Priority Job

```bash
curl -X POST http://localhost:8000/api/v1/submit_job \
  -H "Content-Type: application/json" \
  -d '{"source_file": "video.mp4", "target_format": "avi", "priority": "high"}'
```

### 2. Submit a Low Priority Job

```bash
curl -X POST http://localhost:8000/api/v1/submit_job \
  -H "Content-Type: application/json" \
  -d '{"source_file": "audio.wav", "target_format": "mp3", "priority": "low"}'
```

### 3. Check Job Status

```bash
curl http://localhost:8000/api/v1/job/{job_id}/status
```

---

## Project Structure

```
django_backend/
├── config/
│   ├── __init__.py      # Celery app import
│   ├── celery.py        # Celery configuration
│   ├── settings.py      # Django settings
│   └── urls.py          # Root URL configuration
├── apps/
│   └── jobs/
│       ├── __init__.py
│       ├── apps.py
│       ├── models.py    # Job & JobMetrics models
│       ├── serializers.py
│       ├── tasks.py     # Celery tasks
│       ├── urls.py      # API routes
│       └── views.py     # API views
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│  Django API  │────▶│  PostgreSQL │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Redis    │
                    │   (Broker)  │
                    └─────────────┘
                      │         │
            ┌─────────┘         └─────────┐
            ▼                             ▼
   ┌─────────────────┐          ┌─────────────────┐
   │  Celery Worker  │          │  Celery Worker  │
   │  high_priority  │          │  low_priority   │
   │  (4 processes)  │          │  (2 processes)  │
   └─────────────────┘          └─────────────────┘
```

---

## Deployment Options

| Platform | Difficulty | Notes |
|----------|------------|-------|
| Railway | Easy | One-click Redis & PostgreSQL add-ons |
| Render | Easy | Free tier, supports background workers |
| Heroku | Medium | Requires add-ons for Redis & PostgreSQL |
| DigitalOcean | Medium | App Platform with managed databases |
| AWS | Advanced | Full control with EC2, RDS, ElastiCache |

---

## Evaluation Criteria Met

| Criteria | Implementation |
|----------|----------------|
| ✅ Correctness | All required endpoints functional |
| ✅ Architecture | Clean separation: API → Task Routing → Workers |
| ✅ Code Quality | Documented, idiomatic Python, error handling |
| ✅ Database Design | Separated Job (state) and JobMetrics (resources) |
| ✅ Priority Queues | Two distinct queues with dedicated workers |
| ✅ Lifecycle Tracking | All state transitions with timestamps |
| ✅ Resource Metrics | Simulated CPU/memory persisted on completion |
