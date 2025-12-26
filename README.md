# Priority Media Processor Backend

A robust backend system that manages asynchronous media processing jobs with priority-based queues, lifecycle management, and resource tracking.

## 🎯 Project Goal

This project demonstrates a backend system that:
1. Accepts processing jobs via REST API
2. Processes them asynchronously using background workers
3. Uses priority-based queues (high/low)
4. Tracks job lifecycle through state machine
5. Stores simulated resource usage metrics
6. Displays job status in a clean UI

## 🛠️ Technology Stack

### Backend (Simulated)
- **Django** - Web framework
- **Django REST Framework** - API endpoints
- **Celery** - Asynchronous task queue
- **Redis** - Message broker
- **PostgreSQL** - Database

### Frontend (Demo UI)
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

> **Note**: This demo mocks the backend logic in the frontend for demonstration purposes.

## 📊 Database Schema

### Job Table (Operational State)
| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(50) | Primary key |
| source_file | VARCHAR(255) | Input file name |
| target_format | VARCHAR(50) | Output format |
| priority | ENUM('high','low') | Queue priority |
| status | ENUM(...) | Current state |
| created_at | TIMESTAMP | Creation time |
| queued_at | TIMESTAMP | Queue entry time |
| started_at | TIMESTAMP | Processing start |
| completed_at | TIMESTAMP | Completion time |

### JobMetrics Table (Resource Usage)
| Field | Type | Description |
|-------|------|-------------|
| id | VARCHAR(50) | Primary key |
| job_id | VARCHAR(50) | Foreign key to Job |
| peak_cpu_usage | INTEGER | CPU percentage |
| memory_usage_mb | INTEGER | Memory in MB |
| created_at | TIMESTAMP | Record creation |

**Relationship**: JobMetrics.job_id → Job.id (One-to-One)

## 🔄 Job Lifecycle

```
PENDING → QUEUED → IN_PROGRESS → COMPLETED / FAILED
```

- **PENDING**: Job created, awaiting queue assignment
- **QUEUED**: Job in priority queue, waiting for worker
- **IN_PROGRESS**: Worker processing the job
- **COMPLETED**: Successfully processed
- **FAILED**: Processing failed (5% failure rate for demo)

## 🚀 API Endpoints

### POST /api/v1/submit_job

Submit a new processing job.

**Request:**
```json
{
  "source_file": "sample.mp4",
  "target_format": "avi",
  "priority": "high"
}
```

**Response (201 Created):**
```json
{
  "job_id": "job_1703567890_abc123def",
  "status": "PENDING",
  "priority": "high",
  "message": "Job submitted successfully"
}
```

### GET /api/v1/job/{id}/status

Get job status and resource metrics.

**Response (200 OK):**
```json
{
  "job_id": "job_1703567890_abc123def",
  "status": "COMPLETED",
  "priority": "high",
  "queued_at": "2024-12-26T10:30:01Z",
  "started_at": "2024-12-26T10:30:02Z",
  "completed_at": "2024-12-26T10:30:09Z",
  "metrics": {
    "peak_cpu_usage": 75,
    "memory_usage_mb": 512
  }
}
```

## ⚙️ Celery Multi-Queue Configuration

### Queue Setup
```python
# config/celery.py
CELERY_TASK_ROUTES = {
    'apps.jobs.tasks.process_high_priority': {'queue': 'high_priority'},
    'apps.jobs.tasks.process_low_priority': {'queue': 'low_priority'},
}
```

### Worker Commands
```bash
# High priority worker (faster processing)
celery -A config worker --queues=high_priority --concurrency=4 --loglevel=info

# Low priority worker
celery -A config worker --queues=low_priority --concurrency=2 --loglevel=info
```

### Priority Behavior
- **High Priority**: 1 second queue delay, higher worker concurrency
- **Low Priority**: 2.5 second queue delay, lower worker concurrency

## 🐳 Docker Setup (Production)

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis

  celery-high:
    build: .
    command: celery -A config worker --queues=high_priority --concurrency=4
    depends_on:
      - redis

  celery-low:
    build: .
    command: celery -A config worker --queues=low_priority --concurrency=2
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: media_processor
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

## 🧪 Testing the System

1. **Submit a Job**: Go to Submit Job page, fill in source file and target format, select priority, click Submit
2. **View Dashboard**: Navigate to Dashboard to see real-time job status
3. **Check Queue Visualization**: See jobs flowing through high/low priority queues
4. **Lookup Specific Job**: Use Job Status Lookup with job ID
5. **View Metrics**: Completed jobs show CPU and memory usage

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SubmitJobForm.tsx
│   │   ├── JobsTable.tsx
│   │   ├── JobLookup.tsx
│   │   ├── QueueStats.tsx
│   │   ├── QueueVisualization.tsx
│   │   ├── DatabaseSchema.tsx
│   │   ├── ApiDocumentation.tsx
│   │   └── ArchitectureDiagram.tsx
│   ├── lib/
│   │   └── jobStore.ts (Mock backend)
│   ├── pages/
│   │   ├── Index.tsx (Submit Job)
│   │   ├── Dashboard.tsx
│   │   └── Documentation.tsx
│   └── App.tsx
├── README.md
└── package.json
```

## ✅ Features Implemented

- [x] POST /api/v1/submit_job endpoint
- [x] GET /api/v1/job/{id}/status endpoint
- [x] Priority-based queue routing (high/low)
- [x] Job lifecycle state machine
- [x] Timestamp tracking (queued_at, started_at, completed_at)
- [x] Resource metrics (CPU, memory)
- [x] Separate data models (Job vs JobMetrics)
- [x] Real-time dashboard with auto-refresh
- [x] Queue visualization
- [x] API documentation
- [x] Database schema documentation
- [x] Architecture diagram
- [x] Responsive design (mobile/tablet/desktop)

## 📝 License

MIT License
