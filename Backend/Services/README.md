# TaskTurf API Documentation

## Overview
TaskTurf is a platform that connects users with service providers. This API provides endpoints for managing services, bookings, reviews, and service history.

## Base URL
```
http://localhost:10000/api
```

## Authentication
All endpoints require authentication using JWT tokens (to be implemented).

## Endpoints

### Services

#### Get All Services
- **GET** `/services`
- Returns a list of all available services
- Query Parameters:
  - `category`: Filter by service category
  - `page`: Page number for pagination
  - `limit`: Number of items per page

#### Get Service by ID
- **GET** `/services/:id`
- Returns details of a specific service

#### Create Service
- **POST** `/services`
- Creates a new service
- Required fields:
  ```json
  {
    "category": "string",
    "title": "string",
    "description": "string",
    "price": "number",
    "provider": "ObjectId"
  }
  ```

#### Update Service
- **PUT** `/services/:id`
- Updates an existing service

#### Delete Service
- **DELETE** `/services/:id`
- Deletes a service

### Bookings

#### Create Booking
- **POST** `/bookings`
- Creates a new booking request
- Required fields:
  ```json
  {
    "service": "ObjectId",
    "scheduledDate": "Date",
    "notes": "string"
  }
  ```

#### Get Booking Status
- **GET** `/bookings/:id`
- Returns booking status and details

#### Update Booking Status
- **PUT** `/bookings/:id/status`
- Updates booking status
- Required fields:
  ```json
  {
    "status": "pending|accepted|rejected|completed|cancelled"
  }
  ```

### Reviews

#### Create Review
- **POST** `/reviews`
- Creates a new review
- Required fields:
  ```json
  {
    "service": "ObjectId",
    "booking": "ObjectId",
    "rating": "number",
    "comment": "string"
  }
  ```

#### Get Service Reviews
- **GET** `/reviews/service/:serviceId`
- Returns all reviews for a specific service

### Service History

#### Get User History
- **GET** `/history/user`
- Returns service history for the authenticated user

#### Get Provider History
- **GET** `/history/provider`
- Returns service history for the authenticated provider

## Error Responses
All error responses follow this format:
```json
{
  "error": {
    "message": "Error message",
    "status": 400
  }
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error