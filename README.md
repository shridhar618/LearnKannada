# LearnKannada Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

Backend server for LearnKannada.ai application with authentication and progress tracking.

## Features

- ✅ User authentication (Signup/Login)
- ✅ JWT token-based session management
- ✅ Progress tracking (Lessons & Quizzes)
- ✅ Secure password hashing with bcrypt
- ✅ RESTful API endpoints

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file (optional):

```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production
```

### 3. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET `/api/auth/verify`
Verify JWT token and get user info.

**Headers:**
```
Authorization: Bearer <token>
```

### Progress Tracking

#### GET `/api/progress`
Get user's progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "progress": {
    "lessons": ["greetings", "numbers"],
    "quizzes": {
      "greetings": 80,
      "numbers": 100
    },
    "wordsLearned": 25,
    "quizzesCompleted": 2,
    "averageScore": 90
  }
}
```

#### POST `/api/progress/lesson`
Update lesson progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "category": "greetings"
}
```

#### POST `/api/progress/quiz`
Update quiz progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "category": "greetings",
  "score": 80,
  "wordsLearned": 25
}
```

#### POST `/api/progress/words`
Update words learned count.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "wordsLearned": 50
}
```

## Data Storage

Currently uses JSON files for data storage:
- `data/users.json` - User accounts
- `data/progress.json` - User progress

For production, consider migrating to:
- MongoDB
- PostgreSQL
- MySQL
- Firebase

## Security Notes

1. **Change JWT_SECRET** in production
2. Use HTTPS in production
3. Implement rate limiting
4. Add input validation
5. Consider using a proper database
6. Add password strength requirements
7. Implement password reset functionality

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add rate limiting
- [ ] Migrate to MongoDB/PostgreSQL
- [ ] Add API documentation with Swagger
- [ ] Implement admin endpoints
- [ ] Add analytics tracking

## License

MIT, as declared in `package.json`.
