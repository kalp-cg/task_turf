# TaskTurf Backend API

Complete backend for TaskTurf - a service worker marketplace platform connecting users with skilled workers.

## Features

- **Unified Authentication System** - JWT-based auth for users and workers
- **Role-Based Access Control** - Separate permissions for users vs workers
- **Complete Booking System** - Full workflow from request to completion
- **Advanced Worker Search** - Filter by service, location, rating, price
- **Security Features** - Rate limiting, input validation, helmet protection
- **Professional Architecture** - Middleware, error handling, logging

## 📁 Project Structure

```
backend/
├── server.js                # Main application entry point
├── package.json             # Dependencies and scripts  
├── .env                     # Environment variables (local)
├── .env.example            # Environment template
├── README.md               # This documentation
├── API_DOCUMENTATION.md    # Detailed API reference
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── validation.js      # Input validation middleware  
├── routes/
│   ├── auth.js            # Authentication endpoints
│   ├── profile.js         # Profile management endpoints
│   ├── services.js        # Service discovery endpoints
│   ├── workers.js         # Worker management endpoints
│   └── bookings.js        # Booking management endpoints
└── utils/
    ├── database.js        # MongoDB connection management
    └── init-db.js         # Database initialization and seeding
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Update `.env` file with your settings:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=taskturf
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

### 3. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register/user` | Register new user | ❌ |
| POST | `/register/worker` | Register new worker | ❌ |
| POST | `/login` | Login user/worker | ❌ |
| GET | `/profile` | Get current user profile | ✅ |
| GET | `/verify` | Verify JWT token | ✅ |

### Workers (`/api/workers`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all workers (with filters) | ❌ |
| GET | `/:id` | Get worker by ID | ❌ |
| GET | `/service/:serviceType` | Get workers by service | ❌ |
| PUT | `/profile` | Update worker profile | ✅ (Worker) |
| PATCH | `/availability` | Toggle availability | ✅ (Worker) |
| GET | `/stats/dashboard` | Get worker statistics | ✅ (Worker) |

### Bookings (`/api/bookings`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new booking | ✅ (User) |
| GET | `/user` | Get user's bookings | ✅ (User) |
| GET | `/worker` | Get worker's bookings | ✅ (Worker) |
| PATCH | `/:id/status` | Update booking status | ✅ (Worker) |
| PATCH | `/:id/cancel` | Cancel booking | ✅ (User) |

## Database Schema

### Collections:
- **users** - Service seekers (customers)
- **workers** - Service providers
- **bookings** - Service requests and orders

### Sample Data Structures:

**User:**
```json
{
  "_id": "ObjectId",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City",
  "role": "user",
  "password": "hashed_password",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true
}
```

**Worker:**
```json
{
  "_id": "ObjectId",
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "address": "456 Oak Ave, City",
  "skill": "Plumbing",
  "experience": 5,
  "charge": 1000,
  "ratings": 4.8,
  "role": "worker",
  "password": "hashed_password",
  "description": "5 years of experience in Plumbing",
  "isAvailable": true,
  "isVerified": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "completedJobs": 0,
  "totalEarnings": 0
}
```

**Booking:**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "workerId": "ObjectId",
  "serviceType": "Plumbing",
  "address": "789 Pine St, City",
  "scheduledDate": "2024-01-15T10:00:00Z",
  "description": "Fix kitchen sink",
  "amount": 1000,
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Authentication Flow

1. **Registration** - User/Worker creates account with hashed password
2. **Login** - Validates credentials and returns JWT token
3. **Authorization** - Token required for protected routes
4. **Role-based Access** - Different permissions for users vs workers

## Security Features

- **JWT Authentication** with secure secret key
- **Password Hashing** using bcrypt (12 rounds)
- **Rate Limiting** (100 requests per 15 minutes)
- **Input Validation** using express-validator
- **Helmet** for security headers
- **CORS** configuration for frontend integration

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## Development

### Health Check
```bash
GET /health
```

### Error Handling
All endpoints return consistent error format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // validation errors if applicable
}
```

### Success Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {} // response data
}
```

This backend provides a solid foundation for the TaskTurf platform with professional-grade architecture and security.
