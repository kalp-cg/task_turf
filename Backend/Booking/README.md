# Booking System Backend

A robust Node.js/Express.js backend API for managing bookings and assignments.

## Features

- Create, read, update bookings
- Manage booking statuses (pending, in_progress, completed, cancelled)
- Filter bookings by status and date
- User-specific and worker-specific booking views
- Bulk booking operations
- Sorting and filtering capabilities
- Input validation
- Error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- CORS
- Helmet

## API Endpoints

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/upcoming` - Get upcoming bookings
- `GET /api/bookings/completed` - Get completed bookings
- `GET /api/bookings/pending` - Get pending bookings
- `GET /api/bookings/user/:userId` - Get user's bookings
- `GET /api/bookings/worker/:workerId` - Get worker's bookings
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/bulk` - Create multiple bookings
- `DELETE /api/bookings/completed` - Delete completed bookings
- `POST /api/bookings/:id/reschedule` - Reschedule a booking
- `GET /api/bookings?sort=date&order=desc` - Get sorted bookings

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB locally or update connection string in `src/index.js`
4. Run the server:
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/booking-system)

## Data Models

### Booking

```javascript
{
  userId: ObjectId,
  workerId: ObjectId,
  status: enum['pending', 'in_progress', 'completed', 'cancelled'],
  scheduledDate: Date,
  description: String,
  urgency: enum['low', 'medium', 'high'],
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Database errors
- Invalid ID formats
- General server errors

## Security

- CORS enabled
- Helmet security headers
- Input validation
- MongoDB injection protection

## Development

```bash
# Run in development mode
npm run dev

# Run in production mode
npm start
```