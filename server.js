// ===========================
// LearnKannada Backend Server
// ===========================
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
}

// Initialize data files
async function initializeData() {
    await ensureDataDir();
    
    const usersFile = path.join(DATA_DIR, 'users.json');
    const progressFile = path.join(DATA_DIR, 'progress.json');
    
    try {
        await fs.access(usersFile);
    } catch {
        await fs.writeFile(usersFile, JSON.stringify([]));
    }
    
    try {
        await fs.access(progressFile);
    } catch {
        await fs.writeFile(progressFile, JSON.stringify({}));
    }
}

// Read users from file
async function getUsers() {
    try {
        const data = await fs.readFile(path.join(DATA_DIR, 'users.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Save users to file
async function saveUsers(users) {
    await fs.writeFile(
        path.join(DATA_DIR, 'users.json'),
        JSON.stringify(users, null, 2)
    );
}

// Read progress from file
async function getProgress() {
    try {
        const data = await fs.readFile(path.join(DATA_DIR, 'progress.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

// Save progress to file
async function saveProgress(progress) {
    await fs.writeFile(
        path.join(DATA_DIR, 'progress.json'),
        JSON.stringify(progress, null, 2)
    );
}

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// ===========================
// Authentication Routes
// ===========================

// Signup
app.post('/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const users = await getUsers();

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await saveUsers(users);

        // Create JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Initialize user progress
        const progress = await getProgress();
        progress[newUser.id] = {
            lessons: [],
            quizzes: {},
            wordsLearned: 0,
            quizzesCompleted: 0,
            averageScore: 0
        };
        await saveProgress(progress);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify token
app.get('/auth/verify', authenticateToken, async (req, res) => {
    try {
        const users = await getUsers();
        const user = users.find(u => u.id === req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ===========================
// Progress Routes
// ===========================

// Get user progress
app.get('/progress', authenticateToken, async (req, res) => {
    try {
        const progress = await getProgress();
        const userProgress = progress[req.user.id] || {
            lessons: [],
            quizzes: {},
            wordsLearned: 0,
            quizzesCompleted: 0,
            averageScore: 0
        };

        res.json({
            success: true,
            progress: userProgress
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update lesson progress
app.post('/progress/lesson', authenticateToken, async (req, res) => {
    try {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        const progress = await getProgress();
        
        if (!progress[req.user.id]) {
            progress[req.user.id] = {
                lessons: [],
                quizzes: {},
                wordsLearned: 0,
                quizzesCompleted: 0,
                averageScore: 0
            };
        }

        const userProgress = progress[req.user.id];

        // Add category if not already present
        if (!userProgress.lessons.includes(category)) {
            userProgress.lessons.push(category);
            // Calculate words learned (approximate - you might want to pass this from frontend)
            userProgress.wordsLearned += 10; // Default estimate
        }

        await saveProgress(progress);

        res.json({
            success: true,
            progress: userProgress
        });
    } catch (error) {
        console.error('Update lesson progress error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update quiz progress
app.post('/progress/quiz', authenticateToken, async (req, res) => {
    try {
        const { category, score, wordsLearned } = req.body;

        if (!category || score === undefined) {
            return res.status(400).json({ error: 'Category and score are required' });
        }

        const progress = await getProgress();
        
        if (!progress[req.user.id]) {
            progress[req.user.id] = {
                lessons: [],
                quizzes: {},
                wordsLearned: 0,
                quizzesCompleted: 0,
                averageScore: 0
            };
        }

        const userProgress = progress[req.user.id];

        // Update quiz score
        userProgress.quizzes[category] = score;
        userProgress.quizzesCompleted = Object.keys(userProgress.quizzes).length;

        // Update words learned if provided
        if (wordsLearned) {
            userProgress.wordsLearned = wordsLearned;
        }

        // Calculate average score
        const scores = Object.values(userProgress.quizzes);
        if (scores.length > 0) {
            userProgress.averageScore = Math.round(
                scores.reduce((a, b) => a + b, 0) / scores.length
            );
        }

        await saveProgress(progress);

        res.json({
            success: true,
            progress: userProgress
        });
    } catch (error) {
        console.error('Update quiz progress error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update words learned
app.post('/progress/words', authenticateToken, async (req, res) => {
    try {
        const { wordsLearned } = req.body;

        if (wordsLearned === undefined) {
            return res.status(400).json({ error: 'Words learned count is required' });
        }

        const progress = await getProgress();
        
        if (!progress[req.user.id]) {
            progress[req.user.id] = {
                lessons: [],
                quizzes: {},
                wordsLearned: 0,
                quizzesCompleted: 0,
                averageScore: 0
            };
        }

        progress[req.user.id].wordsLearned = wordsLearned;
        await saveProgress(progress);

        res.json({
            success: true,
            progress: progress[req.user.id]
        });
    } catch (error) {
        console.error('Update words learned error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ===========================
// Health Check
// ===========================
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'LearnKannada API is running' });
});

// Basic root handler to avoid "Cannot GET /"
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'LearnKannada backend is running',
        endpoints: ['/health', '/auth/signup', '/auth/login', '/auth/verify', '/progress']
    });
});

// ===========================
// Start Server
// ===========================
async function startServer() {
    await initializeData();
    app.listen(PORT, () => {
        console.log(`🚀 LearnKannada backend server running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
}

startServer().catch(console.error);

