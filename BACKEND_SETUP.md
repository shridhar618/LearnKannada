# Backend Setup Guide for LearnKannada.ai

## Overview

This guide will help you set up the backend server for LearnKannada.ai. The backend provides:
- User authentication (signup/login)
- Progress tracking (lessons & quizzes)
- Secure password hashing
- JWT token-based sessions

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-Origin Resource Sharing
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `nodemon` - Development server (auto-reload)

### 2. Start the Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Update Frontend API URL (if needed)

If your backend is running on a different port or domain, update the API URL in `js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

Change to your server URL if different.

### 4. Test the Backend

Open your browser and visit:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "LearnKannada API is running"
}
```

## Frontend Integration

The frontend is already configured to use the backend API. The system will:
1. **Try backend first** - Attempts to connect to the backend API
2. **Fallback to localStorage** - If backend is unavailable, uses localStorage (for offline development)

### Enable/Disable Backend

In `script.js`, you can control whether to use the backend:

```javascript
const USE_BACKEND = true; // Set to false to use localStorage only
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/verify` - Verify JWT token

### Progress

- `GET /api/progress` - Get user progress
- `POST /api/progress/lesson` - Update lesson progress
- `POST /api/progress/quiz` - Update quiz progress
- `POST /api/progress/words` - Update words learned

## Data Storage

Currently uses JSON files:
- `backend/data/users.json` - User accounts
- `backend/data/progress.json` - User progress

**Note:** For production, consider migrating to a database:
- MongoDB
- PostgreSQL
- MySQL
- Firebase

## Security

### Important Security Notes

1. **Change JWT_SECRET** - Update the secret key in production
2. **Use HTTPS** - Always use HTTPS in production
3. **Environment Variables** - Store secrets in `.env` file
4. **Rate Limiting** - Add rate limiting to prevent abuse
5. **Input Validation** - Add more robust input validation
6. **Password Strength** - Implement password strength requirements

### Setting Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production-12345
```

Update `server.js` to use environment variables:

```javascript
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
```

## Production Deployment

### Option 1: Deploy to Heroku

1. Create a Heroku app
2. Set environment variables
3. Deploy:

```bash
git push heroku main
```

### Option 2: Deploy to Vercel/Netlify

1. Create a serverless function
2. Deploy the backend as serverless functions

### Option 3: Deploy to AWS/DigitalOcean

1. Set up a Node.js server
2. Use PM2 for process management
3. Set up Nginx as reverse proxy
4. Configure SSL certificate

## Troubleshooting

### Backend not starting

- Check if port 3000 is already in use
- Verify Node.js version (v14+)
- Check if all dependencies are installed

### CORS errors

- Ensure CORS is enabled in `server.js`
- Check if frontend URL is allowed
- Verify API URL in frontend matches backend

### Authentication not working

- Check if JWT_SECRET is set
- Verify token is being sent in headers
- Check browser console for errors

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add rate limiting
- [ ] Migrate to MongoDB/PostgreSQL
- [ ] Add API documentation (Swagger)
- [ ] Implement admin endpoints
- [ ] Add analytics tracking
- [ ] Set up database migrations
- [ ] Add unit tests
- [ ] Add integration tests

## Support

For issues or questions, please check:
1. Backend logs in console
2. Browser console for frontend errors
3. Network tab for API requests
4. Backend README.md for API documentation

