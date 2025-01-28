# Fitness Workout Tracker API

A RESTful API built with Express.js and TypeScript for managing fitness workouts, exercises, and user progress tracking.

## Features

- User authentication (signup/login) with JWT
- Workout management (create, read, update, delete)
- Exercise tracking within workouts
- Progress reporting
- Role-based access control
- MongoDB integration with Mongoose
- Input validation
- Protected routes with Passport.js
- Rate limiting for security
- Error handling middleware

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/YannickGbaka/fitness-workout-tracker.git
cd fitness-workout-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3006
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=fitness_tracker
JWT_SECRET=your_jwt_secret
APP_ENV=development
```

## Running the Application

Development mode:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/v1/auth/signup` - Register a new user
  - Required fields: firstName, lastName, email, password, role
- POST `/api/v1/auth/login` - Login user
  - Required fields: email, password
  - Returns: JWT token

### Users
- GET `/api/v1/users` - List all users (admin only)
- GET `/api/v1/users/:userId` - Get user details
- PUT `/api/v1/users/:userId` - Update user
- DELETE `/api/v1/users/:userId` - Delete user

### Workouts
- GET `/api/v1/workouts` - List all workouts
- GET `/api/v1/workouts/:id` - Get single workout
- POST `/api/v1/workouts` - Create new workout
  - Required fields: title, userId, scheduledDate
- PUT `/api/v1/workouts/:id` - Update workout
- DELETE `/api/v1/workouts/:id` - Delete workout

### Exercises
- GET `/api/v1/workouts/:workoutId/exercices` - List exercises for workout
- GET `/api/v1/workouts/:workoutId/exercices/:exerciceId` - Get exercise details
- POST `/api/v1/workouts/:workoutId/exercices` - Add exercise to workout
  - Required fields: name, repsOrDuration
- PUT `/api/v1/workouts/:workoutId/exercices/:exerciceId` - Update exercise
- DELETE `/api/v1/workouts/:workoutId/exercices/:exerciceId` - Delete exercise

### Reports
- GET `/api/v1/reports/completion` - Get workout completion statistics

## Project Structure

```
fitness-workout-tracker/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middleware
│   ├── mongoose/       # Database models and schemas
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   ├── strategies/     # Passport.js strategies
│   ├── utils/         # Utility functions
│   ├── index.ts       # App configuration
│   └── server.ts      # Server entry point
└── package.json       # Project dependencies
```

## Technologies Used

- Express.js - Web framework
- TypeScript - Programming language
- MongoDB with Mongoose - Database
- JWT - Authentication
- Passport.js - Route protection
- Express Validator - Input validation
- Bcrypt - Password hashing
- Winston - Logging
- Helmet - Security headers
- Express Rate Limit - Rate limiting

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

ISC