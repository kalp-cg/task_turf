# TaskTurf API Documentation

## Overview
TaskTurf is a comprehensive home services platform API that connects users with skilled workers. The API provides authentication, booking management, service discovery, and profile management capabilities.

**Base URL**: `http://localhost:9000/api` (development)  
**Authentication**: JWT Bearer Token  
**Content-Type**: `application/json`

---

## Authentication

### Register User
**POST** `/auth/register/user`

Register a new user account.

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "60f7b3b9c4a8c2001f5e4b1a",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Register Worker
**POST** `/auth/register/worker`

Register a new worker account.

**Request Body:**
```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane.smith@example.com",
  "password": "password123",
  "phone": "+1234567891",
  "skill": "Cleaning",
  "experience": 5,
  "bio": "Professional cleaner with 5 years experience",
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zipcode": "90210"
  }
}
```

### Login
**POST** `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "60f7b3b9c4a8c2001f5e4b1a",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Logout
**POST** `/auth/logout`
*Requires Authentication*

Logout the current user.

---

## Profile Management

### Get Profile
**GET** `/profile`
*Requires Authentication*

Get current user's profile with statistics (for workers).

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "60f7b3b9c4a8c2001f5e4b1a",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipcode": "10001"
    },
    "createdAt": "2021-07-21T10:00:00.000Z"
  }
}
```

### Update Profile
**PUT** `/profile`
*Requires Authentication*

Update user profile information.

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 New St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001"
  },
  "bio": "Updated bio" // Workers only
}
```

### Update Profile Photo
**PATCH** `/profile/photo`
*Requires Authentication*

Update profile photo URL.

**Request Body:**
```json
{
  "profilePhoto": "https://example.com/photo.jpg"
}
```

### Change Password
**PATCH** `/profile/password`
*Requires Authentication*

Change user password.

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

### Get Booking History
**GET** `/profile/bookings?page=1&limit=10&status=completed`
*Requires Authentication*

Get user's booking history with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by booking status

---

## Services

### Get All Services
**GET** `/services?page=1&limit=12&category=cleaning`

Get all available services with optional filtering.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category
- `sortBy` (optional): Sort field (price, popularity)
- `sortOrder` (optional): asc or desc

**Response:**
```json
{
  "success": true,
  "count": 12,
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "services": [
    {
      "_id": "60f7b3b9c4a8c2001f5e4b1b",
      "name": "House Cleaning",
      "category": "cleaning",
      "description": "Professional house cleaning service",
      "basePrice": 500,
      "duration": 120,
      "popularity": 95,
      "tags": ["cleaning", "house", "professional"]
    }
  ]
}
```

### Get Service by ID
**GET** `/services/:id`

Get detailed information about a specific service.

### Get Services by Category
**GET** `/services/category/:category`

Get all services in a specific category.

### Search Services
**GET** `/services/search?q=cleaning&location=New York&priceRange=100-800`

Search services with advanced filters.

**Query Parameters:**
- `q`: Search query
- `location`: Location filter
- `priceRange`: Price range (min-max)
- `rating`: Minimum rating
- `availability`: Filter by availability

---

## Workers

### Get All Workers
**GET** `/workers?skill=cleaning&city=New York&rating=4&page=1`

Get all workers with optional filtering.

**Query Parameters:**
- `skill`: Filter by skill
- `city`: Filter by city
- `rating`: Minimum rating
- `available`: Only available workers
- `page`: Page number
- `limit`: Items per page

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "workers": [
    {
      "_id": "60f7b3b9c4a8c2001f5e4b1c",
      "firstname": "Jane",
      "lastname": "Smith",
      "skill": "Cleaning",
      "experience": 5,
      "rating": 4.8,
      "charge": 600,
      "isAvailable": true,
      "completedJobs": 156,
      "address": {
        "city": "New York",
        "state": "NY"
      }
    }
  ]
}
```

### Get Worker by ID
**GET** `/workers/:id`

Get detailed information about a specific worker.

### Get Worker Statistics
**GET** `/workers/:id/stats`
*Requires Authentication*

Get detailed statistics for a worker (workers can only see their own stats).

---

## Bookings

### Create Booking
**POST** `/bookings`
*Requires Authentication (User only)*

Create a new booking with multi-step process support.

**Request Body:**
```json
{
  "workerId": "60f7b3b9c4a8c2001f5e4b1c",
  "serviceId": "60f7b3b9c4a8c2001f5e4b1b",
  "scheduledDate": "2024-01-15T10:00:00Z",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001"
  },
  "contactInfo": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john.doe@example.com",
    "preferredContact": "phone"
  },
  "serviceDetails": {
    "description": "Clean entire house",
    "specialInstructions": "Please use eco-friendly products",
    "estimatedDuration": 120,
    "urgency": "standard"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "60f7b3b9c4a8c2001f5e4b1d",
    "bookingId": "TT-20240115-001",
    "status": "pending",
    "totalAmount": 650,
    "urgencyMultiplier": 1.0,
    "finalAmount": 650,
    "timeline": {
      "created": "2024-01-15T08:00:00Z",
      "estimatedCompletion": "2024-01-15T12:00:00Z"
    }
  }
}
```

### Get User Bookings
**GET** `/bookings/my?status=pending&page=1`
*Requires Authentication*

Get current user's bookings (different response for users vs workers).

### Get Booking by ID
**GET** `/bookings/:id`
*Requires Authentication*

Get detailed booking information.

### Update Booking Status
**PATCH** `/bookings/:id/status`
*Requires Authentication*

Update booking status (workers can accept/reject, users can cancel).

**Request Body:**
```json
{
  "status": "accepted", // accepted, rejected, cancelled, completed
  "message": "I'll be there on time!"
}
```

### Rate Booking
**POST** `/bookings/:id/rate`
*Requires Authentication*

Rate a completed booking.

**Request Body:**
```json
{
  "rating": 5,
  "review": "Excellent service, very professional!"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token is required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Something went wrong!"
}
```

---

## Rate Limiting

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Booking creation**: 10 requests per hour per user

---

## Authentication Headers

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Database Collections

### Users
- User profiles and authentication data
- Indexes: email (unique), phone, address.city

### Workers  
- Worker profiles with skills and availability
- Indexes: email (unique), skill, rating, isAvailable

### Services
- Available service categories and pricing
- Indexes: category, name/description (text), popularity

### Bookings
- Booking transactions and status tracking
- Indexes: userId, workerId, serviceId, status, createdAt

### User Preferences
- User notification and privacy settings
- Indexes: userId (unique)

---

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Create `.env` file with:
   ```
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/taskturf
   JWT_SECRET=your-super-secure-jwt-secret-key
   JWT_EXPIRES_IN=7d
   ```

3. **Initialize Database**
   ```bash
   npm run init-db
   ```

4. **Start Server**
   ```bash
   npm start          # Production
   npm run dev        # Development with nodemon
   ```

5. **Health Check**
   Visit `http://localhost:9000/health`

---

## Sample Data

The database initialization script provides sample data:
- 2 users
- 7 workers across different skills
- 7 service categories
- Proper indexes for performance

---

**API Version**: 1.0  
**Last Updated**: January 2024  
**Contact**: TaskTurf Development Team