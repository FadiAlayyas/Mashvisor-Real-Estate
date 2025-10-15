# 🏠 Mashvisor Real Estate API

A professional, production-ready REST API for managing real estate listings and agent statistics. Built with **Node.js**, **Express**, **MySQL**, **MongoDB**, and **Docker**.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [Docker Setup](#-docker-setup)
- [Development](#-development)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Design Decisions](#-design-decisions)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)

---

## ✨ Features

### Part 1 - MySQL CRUD API for Listings
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ City formatting (stored lowercase, returned capitalized)
- ✅ Price formatting (2 decimal places)
- ✅ Relational data with properties and agents
- ✅ Consistent JSON error responses
- ✅ Input validation and error handling

### Part 2 - MongoDB Aggregation for Active Agents
- ✅ Active agents statistics endpoint
- ✅ Complex aggregation pipeline
- ✅ Price filtering (> $300,000)
- ✅ Views calculation from separate collection
- ✅ Sorted by total views (descending)
- ✅ Includes agents with 0 listings/views

---

## 🛠 Tech Stack

### Backend
- **Node.js 18** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - MySQL ORM
- **Mongoose** - MongoDB ODM
- **Joi** - Input validation
- **Morgan** - HTTP logging
- **CORS** - Cross-origin requests
- **dotenv** - Environment configuration

### Databases
- **MySQL 8.0** - Primary database for listings CRUD
- **MongoDB 7.0** - Analytics and aggregation
- **Docker** - Containerization

### DevOps
- **Docker Compose** - Multi-container orchestration
- **Health Checks** - Service monitoring
- **Volume Persistence** - Data persistence

---

## 🏗 Architecture

### Clean Architecture Pattern
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │───▶│    Services     │───▶│  Repositories   │
│   (Routes)      │    │  (Business)     │    │   (Data Access) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Middlewares   │    │    Utilities    │    │     Models      │
│ (Error, Auth)   │    │  (Formatting)   │    │ (Sequelize/MG)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **Request** → Controller → Service → Repository → Database
2. **Response** ← Controller ← Service ← Repository ← Database
3. **Error Handling** → Middleware → JSON Response

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
    "price": "500000.00",
    "bedrooms": 3,
    "agentId": 1,
    "agentName": "Alice Johnson",
    "state": "California",
    "address": "123 Sunset Blvd",
    "zipCode": "90001",
    "baths": "2.0",
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
git clone <your-repo-url>
cd mashvisor/node-api
```

#### 2. Environment Configuration
Create `.env` file in project root:
```env
NODE_ENV=production
PORT=3000

# MySQL Configuration
MYSQL_HOST=mysql
MYSQL_DB=realestate
MYSQL_USER=app_user
MYSQL_PASS=app_password123

# MongoDB Configuration
MONGO_URI=mongodb://root:rootpassword123@mongodb:27017/realestate?authSource=admin
```

#### 3. Run with Docker
```bash
# Full stack (MySQL + MongoDB + API)
docker-compose up -d --build

# Development mode (databases only)
docker-compose -f docker-compose.dev.yml up -d
npm run dev
```

### Option 2: Local Development

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Setup Databases
- **MySQL**: Create database `realestate`
- **MongoDB**: Create database `realestate`

#### 3. Update Environment
```env
MYSQL_HOST=localhost
MONGO_URI=mongodb://localhost:27017/realestate
```

#### 4. Run Application
```bash
npm run dev
```

---

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

# Access MySQL
docker exec -it mashvisor-mysql mysql -u app_user -p realestate

# Access MongoDB
docker exec -it mashvisor-mongodb mongosh -u root -p realestate
```

---

## 🔧 Development

### Scripts
```bash
npm start          # Production mode
npm run dev        # Development mode with nodemon
npm test           # Run tests (placeholder)
```

### File Watching
```bash
# Development with auto-reload
npm run dev

# Docker with volume mounting
docker-compose -f docker-compose.dev.yml up -d
```

### Database Migrations
```bash
# MySQL tables are auto-created by Sequelize sync()
# MongoDB collections are created by initialization scripts
```

---

## 🧪 Testing

### Manual Testing

#### Test Listings CRUD
```bash
# Create listing
curl -X POST http://localhost:3000/listings \
  -H "Content-Type: application/json" \
  -d '{"property_id":1,"agent_id":1,"title":"Test Home","price":300000}'

# Get all listings
curl http://localhost:3000/listings

# Get specific listing
curl http://localhost:3000/listings/1

# Update listing
curl -X PUT http://localhost:3000/listings/1 \
  -H "Content-Type: application/json" \
  -d '{"price":350000}'

# Delete listing
curl -X DELETE http://localhost:3000/listings/1
```

#### Test Analytics
```bash
# Get active agents stats
curl http://localhost:3000/stats/active-agents
```

### Automated Testing (Future)
```bash
npm test           # Unit tests
npm run test:e2e   # Integration tests
npm run test:cov   # Coverage report
```

---

## 📁 Project Structure

```
mashvisor/node-api/
├── src/
│   ├── config/                 # Database configurations
│   │   ├── db.mysql.js        # Sequelize setup
│   │   ├── db.mongo.js        # Mongoose setup
│   │   └── index.js           # Config index
│   ├── controllers/           # Route controllers
│   │   ├── listingController.js
│   │   └── agentController.js
│   ├── models/               # Database models
│   │   ├── mysql/
│   │   │   └── Listing.js     # Sequelize models
│   │   └── mongo/
│   │       ├── Agent.js       # Mongoose schemas
│   │       └── Listing.js
│   ├── repositories/         # Data access layer
│   │   ├── listingRepository.js
│   │   └── agentRepository.js
│   ├── services/            # Business logic
│   │   ├── listingService.js
│   │   └── agentService.js
│   ├── routes/              # Express routes
│   │   ├── listingRoutes.js
│   │   └── agentRoutes.js
│   ├── middlewares/         # Custom middlewares
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── utils/              # Helper functions
│   │   └── format.js       # City/price formatting
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── docker/                 # Docker initialization
│   ├── mysql/init/         # MySQL setup scripts
│   │   ├── mashvisor_dump_db2.sql
│   │   └── 01-init.sql
│   └── mongodb/init/       # MongoDB setup scripts
│       ├── mashvisor_dump_db1.js
│       ├── agents.json
│       ├── listings.json
│       └── views.json
├── docker-compose.yml      # Production setup
├── docker-compose.dev.yml  # Development setup
├── Dockerfile             # Node.js container
├── .dockerignore          # Docker ignore rules
├── package.json           # Dependencies & scripts
└── README.md             # This file
```

---

## 🎯 Design Decisions

### 1. **Database Architecture**
- **Decision**: Dual database approach (MySQL + MongoDB)
- **Rationale**: 
  - MySQL for ACID transactions and relational data
  - MongoDB for analytics and complex aggregations
  - Best of both worlds for different use cases

### 2. **API Response Format**
- **Decision**: Consistent JSON structure with formatted data
- **Rationale**:
  - City capitalization for better UX
  - Price formatting for currency display
  - Unified error response format

### 3. **Clean Architecture**
- **Decision**: Separation of concerns with layers
- **Rationale**:
  - Controllers handle HTTP requests
  - Services contain business logic
  - Repositories handle data access
  - Easier testing and maintenance

### 4. **Docker Strategy**
- **Decision**: Multi-container setup with health checks
- **Rationale**:
  - Consistent development environment
  - Easy deployment and scaling
  - Service dependency management

### 5. **Error Handling**
- **Decision**: Centralized error middleware
- **Rationale**:
  - Consistent error responses
  - Easy debugging and monitoring
  - User-friendly error messages

---

## 🚀 Future Improvements

### If I Had More Than 4 Hours:

#### 1. **Testing Suite**
- [ ] Unit tests for services and repositories
- [ ] Integration tests for API endpoints
- [ ] End-to-end tests with test databases
- [ ] Test coverage reporting
- [ ] Automated testing in CI/CD

#### 2. **Authentication & Authorization**
- [ ] JWT-based authentication
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Request validation middleware

#### 3. **Performance & Scalability**
- [ ] Database connection pooling
- [ ] Redis caching layer
- [ ] API response caching
- [ ] Database indexing optimization
- [ ] Load balancing support

#### 4. **Monitoring & Logging**
- [ ] Structured logging with Winston
- [ ] Application metrics collection
- [ ] Health check endpoints
- [ ] Error tracking with Sentry
- [ ] Performance monitoring

#### 5. **API Enhancements**
- [ ] Pagination for large datasets
- [ ] Advanced filtering and sorting
- [ ] Search functionality
- [ ] API versioning
- [ ] OpenAPI/Swagger documentation

#### 6. **Data Management**
- [ ] Database migrations system
- [ ] Seed data management
- [ ] Backup and restore procedures
- [ ] Data validation schemas
- [ ] Soft delete functionality

#### 7. **Security**
- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] CORS configuration
- [ ] Environment variable validation
- [ ] Security headers middleware

#### 8. **DevOps & Deployment**
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Multi-environment support (dev/staging/prod)
- [ ] Kubernetes deployment manifests
- [ ] Environment-specific configurations
- [ ] Automated database migrations

#### 9. **Code Quality**
- [ ] ESLint configuration
- [ ] Prettier code formatting
- [ ] Pre-commit hooks
- [ ] Code review guidelines
- [ ] TypeScript migration

#### 10. **Documentation**
- [ ] API documentation with Swagger
- [ ] Architecture decision records (ADRs)
- [ ] Deployment guides
- [ ] Troubleshooting documentation
- [ ] Contributing guidelines

---

## 🔗 Quick Links

- **API Base URL**: `http://localhost:3000`
- **Listings Endpoint**: `GET /listings`
- **Stats Endpoint**: `GET /stats/active-agents`
- **Docker Status**: `docker-compose ps`
- **Logs**: `docker-compose logs -f`

---