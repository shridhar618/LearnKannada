# Quick Start Guide - LearnKannada Backend

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Start the Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Step 3: Open the Frontend

Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then visit `http://localhost:8000`

### Step 4: Test the Integration

1. Create a new account (Sign Up)
2. Login with your credentials
3. Complete a lesson or quiz
4. Check that progress is saved

## 📋 What's Included

### Backend (`/backend`)
- ✅ Express.js server
- ✅ User authentication (JWT tokens)
- ✅ Progress tracking API
- ✅ Password hashing (bcrypt)
- ✅ JSON file storage (easily migratable to database)

### Frontend Updates
- ✅ API service (`js/api.js`)
- ✅ Automatic fallback to localStorage if backend unavailable
- ✅ Async/await for API calls
- ✅ Error handling

## 🔧 Configuration

### Enable/Disable Backend

In `script.js`, line 439:

```javascript
const USE_BACKEND = true; // Set to false for localStorage only
```

### Change API URL

In `js/api.js`, line 2:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## 🗄️ Data Storage

Data is stored in JSON files:
- `backend/data/users.json` - User accounts
- `backend/data/progress.json` - User progress

**Note:** The `data/` folder is created automatically on first run.

## 🔒 Security

For production:
1. Change `JWT_SECRET` in `backend/server.js`
2. Use environment variables (create `.env` file)
3. Enable HTTPS
4. Add rate limiting
5. Migrate to a database (MongoDB, PostgreSQL, etc.)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress/lesson` - Update lesson progress
- `POST /api/progress/quiz` - Update quiz progress

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Verify Node.js is installed (`node --version`)
- Check if dependencies are installed (`npm install`)

### CORS errors
- Backend has CORS enabled by default
- Check browser console for specific errors
- Verify API URL matches backend URL

### Authentication not working
- Check browser console for errors
- Verify backend is running
- Check Network tab for API requests
- Ensure token is being saved in localStorage

## 📖 Next Steps

1. **Test the backend** - Create account, login, complete lessons
2. **Check data files** - Verify data is being saved in `backend/data/`
3. **Review API calls** - Check Network tab in browser dev tools
4. **Customize** - Modify API endpoints, add features
5. **Deploy** - Deploy backend to Heroku, Vercel, or your server

## 💡 Tips

- Backend automatically falls back to localStorage if unavailable
- All API calls are async with proper error handling
- Progress is saved automatically when lessons/quizzes are completed
- JWT tokens expire after 7 days (configurable)

## 🎉 You're Ready!

Your LearnKannada app now has a full backend! Users can:
- Create accounts
- Login securely
- Save progress across devices
- Track learning statistics

For more details, see `BACKEND_SETUP.md`

