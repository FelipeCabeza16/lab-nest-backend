# Labs Nest Back

A NestJS backend application with PostgreSQL database and Redis cache.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

## Services

The application consists of the following services:

### API Service
- NestJS application running on port 3000
- Environment variables:
  - `DATABASE_URL`: PostgreSQL connection string
  - `REDIS_URL`: Redis connection string
  - `PORT`: Application port (default: 3000)

### PostgreSQL Database
- Version: 16.1
- Port: 5433
- Environment variables:
  - `POSTGRES_USER`: Database user (default: postgres)
  - `POSTGRES_PASSWORD`: Database password (default: postgres)
  - `POSTGRES_DB`: Database name (default: labs-nest)

### pgAdmin
- Web-based PostgreSQL administration tool
- Accessible at http://localhost:5050
- Default credentials:
  - Email: admin@admin.com
  - Password: root
- Allows you to:
  - Manage PostgreSQL databases
  - Execute SQL queries
  - Monitor database performance
  - Create and manage database backups

### Redis Cache
- Version: 7.2.3
- Port: 6379

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd labs-nest-back
```

2. Start the services:
```bash
docker-compose up -d
```

This will start:
- The NestJS API on http://localhost:3000
- PostgreSQL database on localhost:5433
- pgAdmin interface on http://localhost:5050
- Redis cache on localhost:6379

## Development

For local development without Docker:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/labs-nest
REDIS_URL=redis://localhost:6379
PORT=3000
```

## Stopping the Services

To stop all services:
```bash
docker-compose down
```

To stop and remove all data (including database volumes):
```bash
docker-compose down -v
```
