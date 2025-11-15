# TaskTurf Backend API

A comprehensive Node.js/Express backend API for the TaskTurf home services platform. This API provides authentication, profile management, service discovery, booking management, and worker coordination features.

## 🚀 Features

### Authentication & Security
- JWT-based authentication with role-based access control
- Secure password hashing with bcrypt (12 rounds)
- Rate limiting to prevent abuse
- Helmet.js for security headers
- CORS configuration for cross-origin requests

### Core Functionality
- **User Management**: Registration, login, profile management
- **Worker Management**: Skill-based worker profiles, availability tracking
- **Service Discovery**: Categorized services with search and filtering
- **Booking System**: Multi-step booking process with status tracking
- **Profile Management**: Comprehensive user/worker profile controls

### Advanced Features
- **Multi-step Booking Flow**: Matches frontend modal functionality
- **Urgency Pricing**: Dynamic pricing based on booking urgency
- **Statistics Dashboard**: Worker performance metrics
- **Preference Management**: User notification and privacy settings
- **Comprehensive Search**: Text search, location filtering, price ranges

## 📋 Prerequisites

- Node.js >= 16.0.0
- MongoDB >= 4.4
- npm or yarn package manager

## 🛠️ Installation

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd task_turf/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskturf
   JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```

4. **Database Initialization**
   ```bash
   npm run init-db
   ```
   This will:
   - Create necessary database indexes
   - Seed sample data (users, workers, services)
   - Set up collections with proper relationships

5. **Start the Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### Health Check
- `GET /health` - API status and environment info

### Authentication
- `POST /api/auth/register/user` - Register new user
- `POST /api/auth/register/worker` - Register new worker
- `POST /api/auth/login` - User/worker login
- `POST /api/auth/logout` - Logout (requires auth)

### Profile Management
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile information
- `PATCH /api/profile/photo` - Update profile photo
- `PATCH /api/profile/password` - Change password
- `DELETE /api/profile` - Delete account (soft delete)
- `GET /api/profile/bookings` - Get user's booking history
- `GET /api/profile/preferences` - Get user preferences
- `PUT /api/profile/preferences` - Update user preferences

### Services
- `GET /api/services` - Get all services (with filtering/search)
- `GET /api/services/:id` - Get specific service details
- `GET /api/services/category/:category` - Get services by category
- `GET /api/services/search` - Advanced service search
- `GET /api/services/trending` - Get trending services
- `POST /api/services/:id/rate` - Rate a service

### Workers
- `GET /api/workers` - Get all workers (with filtering)
- `GET /api/workers/:id` - Get specific worker details
- `GET /api/workers/:id/stats` - Get worker statistics
- `PUT /api/workers/profile` - Update worker profile (worker only)
- `PATCH /api/workers/availability` - Update availability status

### Bookings
- `POST /api/bookings` - Create new booking (users only)
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/:id` - Get specific booking details
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/rate` - Rate completed booking

## 🗃️ Database Schema

### Collections

#### Users
```javascript
{
  _id: ObjectId,
  firstname: String,
  lastname: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "user",
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  profilePhoto: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

#### Workers
```javascript
{
  _id: ObjectId,
  firstname: String,
  lastname: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "worker",
  skill: String,
  experience: Number,
  bio: String,
  charge: Number,
  description: String,
  address: Object,
  profilePhoto: String,
  isActive: Boolean,
  isAvailable: Boolean,
  rating: Number,
  completedJobs: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Services
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  description: String,
  basePrice: Number,
  duration: Number,
  isActive: Boolean,
  tags: [String],
  requirements: [String],
  popularity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Bookings
```javascript
{
  _id: ObjectId,
  bookingId: String (unique),
  userId: ObjectId,
  workerId: ObjectId,
  serviceId: ObjectId,
  status: String, // pending, accepted, rejected, in_progress, completed, cancelled
  scheduledDate: Date,
  address: Object,
  contactInfo: Object,
  serviceDetails: Object,
  totalAmount: Number,
  finalAmount: Number,
  urgencyMultiplier: Number,
  timeline: Object,
  rating: Number,
  review: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Payload
```javascript
{
  userId: "ObjectId",
  role: "user" | "worker",
  email: "user@example.com",
  iat: timestamp,
  exp: timestamp
}
```

## 🚦 Rate Limiting

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Sensitive operations**: Additional per-user limits

## 🛡️ Security Features

1. **Password Security**: Bcrypt with 12 salt rounds
2. **JWT Security**: Configurable expiration, secure secret
3. **Input Validation**: Express-validator for all inputs
4. **SQL Injection Protection**: MongoDB native driver
5. **XSS Protection**: Helmet.js security headers
6. **CORS**: Configurable cross-origin policies
7. **Rate Limiting**: Express-rate-limit for DDoS protection

## 📁 Project Structure

```
backend/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── README.md             # This file
├── API_DOCUMENTATION.md  # Detailed API documentation
├── middleware/
│   ├── auth.js           # JWT authentication middleware
│   └── validation.js     # Input validation middleware
├── routes/
│   ├── auth.js           # Authentication endpoints
│   ├── profile.js        # Profile management endpoints
│   ├── services.js       # Service discovery endpoints
│   ├── workers.js        # Worker management endpoints
│   └── bookings.js       # Booking management endpoints
└── utils/
    ├── database.js       # MongoDB connection management
    └── init-db.js        # Database initialization and seeding
```

## 🧪 Sample Data

The database initialization creates:
- **2 sample users** with different profiles
- **7 sample workers** across various skills (cleaning, plumbing, electrical, etc.)
- **7 service categories** with pricing and descriptions
- **Proper indexes** for optimal query performance

### Sample Login Credentials
```
Users:
- john.smith@example.com / password123
- sarah.johnson@example.com / password123

Workers:
- mike.wilson@example.com / password123 (Cleaner)
- lisa.brown@example.com / password123 (Plumber)
- david.garcia@example.com / password123 (Electrician)
```

## 📊 API Testing

### Using curl
```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Test","lastname":"User","email":"test@example.com","password":"password123","phone":"+1234567890","address":{"street":"123 Test St","city":"Test City","state":"TS","zipcode":"12345"}}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔧 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database with sample data

### Adding New Features
1. Create route handlers in appropriate files under `routes/`
2. Add validation middleware in `middleware/validation.js`
3. Update authentication middleware if needed
4. Document new endpoints in `API_DOCUMENTATION.md`

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskturf
JWT_SECRET=your-super-secure-production-secret-minimum-32-characters
JWT_EXPIRES_IN=7d
```

### Production Considerations
1. Use environment-specific MongoDB URI
2. Generate strong JWT secret (minimum 32 characters)
3. Configure CORS for production domains
4. Set up proper logging and monitoring
5. Implement backup strategies for MongoDB

## 🐛 Error Handling

The API provides consistent error responses:

```javascript
{
  "success": false,
  "message": "Error description",
  "errors": [/* Validation errors */]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (no token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## 📝 Logging

The API uses Morgan for HTTP request logging in development mode:
- Request method and URL
- Response status code
- Response time
- Request size

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:
- Check the [API Documentation](./API_DOCUMENTATION.md)
- Review error messages and logs
- Contact the TaskTurf development team

---

**Version**: 1.0.0  
**Last Updated**: January 2024