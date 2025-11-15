# 🚀 TaskTurf API Documentation

Complete API reference for the TaskTurf service marketplace platform with role-based authentication.

## 📋 Base Information

- **Base URL**: `https://task-turf-6.onrender.com`
- **Content-Type**: `application/json`
- **Authentication**: Bearer Token (JWT)

## 🔐 Authentication Overview

The API uses JWT tokens for authentication. After login/registration, include the token in requests:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 📚 API Endpoints

### 🔑 **Authentication Routes**

#### 1. **User Registration**
```http
POST https://task-turf-6.onrender.com/api/auth/register/user
```

**Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe", 
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main Street, New York, NY"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isVerified": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 2. **Worker Registration**
```http
POST https://task-turf-6.onrender.com/api/auth/register/worker
```

**Body:**
```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane.smith@example.com", 
  "password": "password123",
  "phone": "+1234567890",
  "address": "456 Oak Avenue, Los Angeles, CA",
  "skill": "Plumbing",
  "experience": 5
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Worker registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "email": "jane.smith@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "worker",
      "skills": ["Plumbing"],
      "experience": 5,
      "hourlyRate": 800,
      "rating": 4.5
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 3. **Admin Registration**
```http
POST https://task-turf-6.onrender.com/api/auth/register/admin
```

**Body:**
```json
{
  "firstname": "Admin",
  "lastname": "User",
  "email": "admin@taskturf.com",
  "password": "admin123",
  "phone": "+1234567890",
  "adminKey": "taskturf-admin-2024"
}
```

#### 4. **Login (Universal)**
```http
POST https://task-turf-6.onrender.com/api/auth/login
```

**Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "john.doe@example.com",
      "role": "user",
      "firstName": "John",
      "lastName": "Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 5. **Refresh Token**
```http
POST https://task-turf-6.onrender.com/api/auth/refresh
```

**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 6. **Get Current User**
```http
GET https://task-turf-6.onrender.com/api/auth/me
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### 7. **Logout**
```http
POST https://task-turf-6.onrender.com/api/auth/logout
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 👤 **Profile Management**

#### 8. **Update Profile**
```http
PUT /api/auth/me
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "bio": "Experienced professional looking for quality services"
}
```

#### 9. **Change Password**
```http
PUT /api/auth/change-password
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

---

### 📍 **Address Management**

#### 10. **Add Address**
```http
POST /api/auth/me/addresses
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body:**
```json
{
  "label": "Home",
  "street": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipcode": "10001",
  "isDefault": true
}
```

#### 11. **Update Address**
```http
PUT /api/auth/me/addresses/{addressId}
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body:**
```json
{
  "label": "Work",
  "street": "456 Business Ave",
  "city": "New York", 
  "state": "NY",
  "zipcode": "10002",
  "isDefault": false
}
```

#### 12. **Delete Address**
```http
DELETE /api/auth/me/addresses/{addressId}
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 💼 **Worker Management**

#### 13. **Add Work History Entry** (Workers Only)
```http
POST /api/auth/me/work-history
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body:**
```json
{
  "clientName": "Robert Johnson",
  "serviceType": "Plumbing",
  "description": "Fixed kitchen sink and replaced faucet",
  "completedDate": "2024-11-10",
  "duration": 3,
  "earnings": 1200,
  "rating": 5,
  "review": "Excellent work, very professional",
  "location": "New York, NY"
}
```

#### 14. **Update Worker Availability** (Workers Only)
```http
PUT /api/auth/me/availability
```

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body:**
```json
{
  "isAvailable": true,
  "availability": {
    "monday": { "available": true, "hours": "9:00-17:00" },
    "tuesday": { "available": true, "hours": "9:00-17:00" },
    "wednesday": { "available": true, "hours": "9:00-17:00" },
    "thursday": { "available": true, "hours": "9:00-17:00" },
    "friday": { "available": true, "hours": "9:00-17:00" },
    "saturday": { "available": false, "hours": "" },
    "sunday": { "available": false, "hours": "" }
  }
}
```

#### 15. **Get Top Rated Workers**
```http
GET /api/auth/workers/top-rated?limit=10
```

**Query Parameters:**
- `limit` (optional): Number of workers to return (default: 10)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "workers": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "Meera",
        "lastName": "Rao",
        "email": "meera.rao.worker1@taskturf.com",
        "role": "worker",
        "skills": ["Gardening"],
        "experience": 6,
        "hourlyRate": 1015,
        "rating": 5.0,
        "completedJobs": 36,
        "isAvailable": true,
        "profileImage": "https://api.dicebear.com/7.x/avataaars/svg?seed=MeeraRao"
      }
    ]
  }
}
```

---

### 👮 **Admin Routes**

#### 16. **Get All Users** (Admin Only)
```http
GET /api/auth/admin/users?page=1&limit=20&role=worker
```

**Headers:**
```
Authorization: Bearer ADMIN_ACCESS_TOKEN
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)  
- `role` (optional): Filter by role (user|worker|admin)

#### 17. **Get User by ID** (Admin Only)
```http
GET /api/auth/admin/users/{userId}
```

**Headers:**
```
Authorization: Bearer ADMIN_ACCESS_TOKEN
```

---

### 🏥 **Health Check**

#### 18. **Health Check**
```http
GET https://task-turf-6.onrender.com/health
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "TaskTurf API is running",
  "timestamp": "2024-11-14T10:30:00.000Z",
  "environment": "development"
}
```

---

## 📝 **Postman Collection Setup**

### 1. **Environment Variables**
Create a Postman environment with these variables:

```
base_url: https://task-turf-6.onrender.com
access_token: {{access_token}}
refresh_token: {{refresh_token}}
```

### 2. **Pre-request Script for Auth**
Add this to requests requiring authentication:

```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('access_token')
});
```

### 3. **Test Scripts for Login**
Add this to your login request test tab:

```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set('access_token', response.data.accessToken);
    pm.environment.set('refresh_token', response.data.refreshToken);
}
```

---

## 🧪 **Test Data**

### **Sample Worker Account** 
- **Email**: `meera.rao.worker1@taskturf.com`
- **Password**: `password123`
- **Role**: worker

### **Sample User Account**
- **Email**: `diya.nair.user1@taskturf.com`  
- **Password**: `password123`
- **Role**: user

### **Admin Account**
- **Email**: `admin@taskturf.com`
- **Password**: `admin123`
- **Role**: admin
- **Admin Key**: `taskturf-admin-2024`

---

## ❌ **Error Responses**

### **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### **401 Unauthorized**
```json
{
  "success": false,
  "message": "Access token required"
}
```

### **403 Forbidden**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### **404 Not Found**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### **409 Conflict**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🚀 **Quick Start Guide**

### 1. **Start the Server**
```bash
cd backend
npm start
```

### 2. **Test Health Check**
```bash
curl https://task-turf-6.onrender.com/health
```

### 3. **Register a New User**
```bash
curl -X POST https://task-turf-6.onrender.com/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Test",
    "lastname": "User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "address": "123 Test Street, Test City"
  }'
```

### 4. **Login**
```bash
curl -X POST https://task-turf-6.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com", 
    "password": "password123"
  }'
```

### 5. **Get Profile (with token)**
```bash
curl -X GET https://task-turf-6.onrender.com/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📊 **Available Skills for Workers**
- Cleaning
- Plumbing  
- Electrical
- Babysitting
- Gardening
- Cooking
- Painting
- Carpentry
- Home Repair
- Tutoring
- Pet Care
- Moving
- Laundry
- Car Wash
- Photography
- Massage

---

## 🔧 **Development Notes**

- **JWT Secret**: Set `JWT_SECRET` environment variable
- **Admin Key**: Set `ADMIN_REGISTRATION_KEY` environment variable  
- **MongoDB**: Database connection configured in `utils/database.js`
- **Validation**: Input validation handled by `express-validator`
- **Password**: Hashed using `bcrypt` with salt rounds 12

---

## 📞 **Support**

For API issues or questions, check:
1. Server logs in terminal
2. MongoDB connection status  
3. Environment variables setup
4. Token expiration (7 days for access, 30 days for refresh)

---

**Happy Testing! 🚀**