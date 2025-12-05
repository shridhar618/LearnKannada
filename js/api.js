// ===========================
// API Service for LearnKannada Backend
// ===========================
const API_BASE_URL = 'http://localhost:3000';

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('kannadaAuthToken');
}

// Save auth token to localStorage
function saveAuthToken(token) {
    localStorage.setItem('kannadaAuthToken', token);
}

// Remove auth token from localStorage
function removeAuthToken() {
    localStorage.removeItem('kannadaAuthToken');
}

// Make API request
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(url, {
            ...options,
            headers
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// ===========================
// Authentication API
// ===========================
const authAPI = {
    async signup(name, email, password) {
        try {
            const response = await apiRequest('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
            
            if (response.success && response.token) {
                saveAuthToken(response.token);
            }
            
            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Signup failed'
            };
        }
    },
    
    async login(email, password) {
        try {
            const response = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            
            if (response.success && response.token) {
                saveAuthToken(response.token);
            }
            
            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Login failed'
            };
        }
    },
    
    async verify() {
        try {
            const response = await apiRequest('/auth/verify', {
                method: 'GET'
            });
            return response;
        } catch (error) {
            removeAuthToken();
            return {
                success: false,
                message: error.message || 'Token verification failed'
            };
        }
    },
    
    logout() {
        removeAuthToken();
    }
};

// ===========================
// Progress API
// ===========================
const progressAPI = {
    async getProgress() {
        try {
            const response = await apiRequest('/progress', {
                method: 'GET'
            });
            
            if (response.success) {
                return response.progress;
            }
            
            return null;
        } catch (error) {
            console.error('Get progress error:', error);
            return null;
        }
    },
    
    async updateLessonProgress(category) {
        try {
            const response = await apiRequest('/progress/lesson', {
                method: 'POST',
                body: JSON.stringify({ category })
            });
            
            return response.success ? response.progress : null;
        } catch (error) {
            console.error('Update lesson progress error:', error);
            return null;
        }
    },
    
    async updateQuizProgress(category, score, wordsLearned) {
        try {
            const response = await apiRequest('/progress/quiz', {
                method: 'POST',
                body: JSON.stringify({ category, score, wordsLearned })
            });
            
            return response.success ? response.progress : null;
        } catch (error) {
            console.error('Update quiz progress error:', error);
            return null;
        }
    },
    
    async updateWordsLearned(wordsLearned) {
        try {
            const response = await apiRequest('/progress/words', {
                method: 'POST',
                body: JSON.stringify({ wordsLearned })
            });
            
            return response.success ? response.progress : null;
        } catch (error) {
            console.error('Update words learned error:', error);
            return null;
        }
    }
};

// Export API functions
window.LearnKannadaAPI = {
    auth: authAPI,
    progress: progressAPI,
    getAuthToken,
    saveAuthToken,
    removeAuthToken
};

