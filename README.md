# 🏠 Mashvisor Real Estate API System

A comprehensive real estate management system with dual APIs built using Laravel and Node.js. The system provides robust functionality for managing property listings, agent information, and property details through two separate but interconnected APIs.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [Docker Setup](#-docker-setup)
- [Project Structure](#-project-structure)
- [Design Decisions](#-design-decisions)
- [Future Improvements](#-future-improvements)

---

## 🛠 Tech Stack

### Laravel API
- **PHP 8.1+** - Programming Language
- **Laravel 10.x** - PHP Framework
- **MySQL** - Primary Database
- **Laravel Sanctum** - API Authentication
- **Laravel Resource** - API Resource Transformation
- **Repository Pattern** - Data Access Layer
- **Service Layer** - Business Logic

### Node.js API
- **Node.js 18+** - Runtime Environment
- **Express.js** - Web Framework
- **Sequelize** - MySQL ORM
- **Mongoose** - MongoDB ODM
- **Joi** - Input Validation
- **Morgan** - HTTP Logging
- **CORS** - Cross-origin Requests

### Databases
- **MySQL 8.0** - Shared Database for Both APIs
- **MongoDB 7.0** - Node.js API Analytics

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Container Orchestration
- **Nginx** - Reverse Proxy
- **Health Checks** - Service Monitoring
- **Volume Persistence** - Data Persistence
- **Git** - Version Control

---

## 🗄 Database Schema

### MySQL Schema (Listings CRUD)

#### Agents Table
```sql
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Properties Table
```sql
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    beds INT NOT NULL,
    baths DECIMAL(3,1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Listings Table
```sql
CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    agent_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_listings_property FOREIGN KEY (property_id) REFERENCES properties(id),
    CONSTRAINT fk_listings_agent FOREIGN KEY (agent_id) REFERENCES agents(id)
);
```

### MongoDB Schema (Analytics)

#### Agents Collection
```javascript
{
  _id: Number,
  name: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Listings Collection
```javascript
{
  _id: Number,
  title: String,
  city: String,
  agentId: Number,
  price: Number,
  bedrooms: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Views Collection
```javascript
{
  listingId: Number,
  date: String,
  views: Number,
  createdAt: Date
}
```

---

## 🚀 API Endpoints

### Listings CRUD (MySQL)

#### Create Listing
```http
POST /listings
Content-Type: application/json

{
  "property_id": 1,
  "agent_id": 1,
  "title": "Beautiful Home",
  "price": 450000
}
```

#### Get All Listings
```http
GET /listings
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Luxury Sunset Blvd Home",
    "city": "Los Angeles",
    "price": 500000.00,
    "bedrooms": 3,
    "agentId": 1,
    "agentName": "Alice Johnson",
    "state": "California",
    "address": "123 Sunset Blvd",
    "zipCode": "90001",
    "baths": 2,
    "createdAt": "2025-01-20T10:00:00.000Z",
    "updatedAt": "2025-01-20T10:00:00.000Z"
  }
]
```

#### Get Listing by ID
```http
GET /listings/:id
```

#### Update Listing
```http
PUT /listings/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 475000
}
```

#### Delete Listing
```http
DELETE /listings/:id
```

### Analytics (MongoDB)

#### Active Agents Statistics
```http
GET /stats/active-agents
```

**Response:**
```json
[
  {
    "agent": "Carol Lee",
    "listings": 1,
    "totalViews": 200
  },
  {
    "agent": "Alice Smith",
    "listings": 0,
    "totalViews": 0
  }
]
```

### Error Response Format
```json
{
  "error": true,
  "message": "Something went wrong"
}
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **Node.js 18+** and npm
- **Docker Desktop** (Windows/Mac/Linux)
- **Git**

### Option 1: Docker Setup (Recommended)

#### 1. Clone the Repository
```bash
git clone https://github.com/FadiAlayyas/Mashvisor-Real-Estate
```

## 🐳 Docker Setup

### Services

#### MySQL Database
- **Image**: mysql:8.0
- **Port**: 3307 (external) → 3306 (internal)
- **Health Check**: mysqladmin ping
- **Data Persistence**: mysql_data volume
- **Initialization**: SQL scripts in `docker/mysql/init/`

#### MongoDB Database
- **Image**: mongo:7.0
- **Port**: 27017
- **Data Persistence**: mongodb_data volume
- **Initialization**: JavaScript scripts in `docker/mongodb/init/`

#### Node.js API
- **Build**: Custom Dockerfile
- **Port**: 3000
- **Health Check**: HTTP endpoint
- **Dependencies**: MySQL (healthy), MongoDB (started)

### Useful Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build --force-recreate

# Clean everything (including volumes)
docker-compose down -v --remove-orphans

# Check service status
docker-compose ps
```

---

### Database Migrations
```bash
# MySQL tables are auto-created by Sequelize sync()
# MongoDB collections are created by initialization scripts
```

## 🎯 Design Decisions

### 1. **Docker Strategy**
- **Decision**: Multi-container setup with health checks
- **Rationale**:
  - Consistent development environment
  - Easy deployment and scaling
  - Service dependency management
---

## 🚀 Future Improvements

### If I Had More Than 4 Hours:

#### 1. **Authentication & Authorization**
- [ ] JWT-based authentication
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Request validation middleware

#### 2. **Performance & Scalability**
- [ ] Database connection pooling
- [ ] Redis caching layer
- [ ] API response caching
- [ ] Database indexing optimization
- [ ] Load balancing support

#### 3. **Monitoring & Logging**
- [ ] Structured logging with Winston
- [ ] Application metrics collection
- [ ] Health check endpoints
- [ ] Error tracking with Sentry
- [ ] Performance monitoring

#### 4. **API Enhancements**
- [ ] Pagination for large datasets
- [ ] Advanced filtering and sorting
- [ ] Search functionality
- [ ] API versioning
- [ ] OpenAPI/Swagger documentation

#### 5. **Data Management**
- [ ] Database migrations system
- [ ] Seed data management
- [ ] Backup and restore procedures
- [ ] Data validation schemas
- [ ] Soft delete functionality

#### 6. **Security**
- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] CORS configuration
- [ ] Environment variable validation
- [ ] Security headers middleware

---

## 🔗 Quick Links

- **API Base URL For Node Js Api**: `http://localhost:3000`
- **API Base URL For Laravel Api**: `http://localhost:8000`
- **Node Listings Endpoint**: `GET /listings`
- **Laravel Listings Endpoint**: `GET /api/laravel/listings`
- **Stats Endpoint**: `GET /stats/active-agents`
- **Docker Status**: `docker-compose ps`
- **Logs**: `docker-compose logs -f`

---