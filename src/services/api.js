// Learning Acceleration API Service - Hybrid Local & Cloud Backend
const getApiEndpoints = () => {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const configured = import.meta.env.VITE_API_URL;

  if (isLocal) {
    return [
      configured || 'http://localhost:5000/api',
      'http://localhost:5000/api',
      'https://learning-acceleration-backend.vercel.app/api'
    ];
  }

  return [
    configured || 'https://learning-acceleration-backend.vercel.app/api',
    'https://learning-acceleration-backend.vercel.app/api'
  ];
};

/**
 * Universal resilient fetch with automated failover between endpoints
 */
async function resilientFetch(path, options = {}) {
  const endpoints = getApiEndpoints();
  let lastError = null;

  for (const base of endpoints) {
    try {
      const url = `${base.replace(/\/$/, '')}${path}`;
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
      return res;
    } catch (err) {
      lastError = err;
      // Try next endpoint
    }
  }

  throw lastError || new Error('Network request failed');
}

/**
 * Register a student into MongoDB database via live backend API
 * @param {Object} studentData - { name, email, age, class, password }
 */
export const registerStudentApi = async (studentData) => {
  try {
    const response = await resilientFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: studentData.name.trim(),
        email: studentData.email.trim(),
        age: parseInt(studentData.age, 10),
        class: studentData.class.trim(),
        password: studentData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Registration failed'
      };
    }

    return {
      success: true,
      message: data.message,
      user: data.user
    };
  } catch (error) {
    console.error('API register error:', error);
    return {
      success: false,
      isNetworkError: true,
      message: 'Could not connect to the backend server. Please verify your connection.'
    };
  }
};

/**
 * Sign in student by checking credentials in live MongoDB database
 * @param {string} email 
 * @param {string} password 
 */
export const loginStudentApi = async (email, password) => {
  try {
    const response = await resilientFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.trim(),
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Invalid email or password'
      };
    }

    return {
      success: true,
      message: data.message,
      user: data.user
    };
  } catch (error) {
    console.error('API login error:', error);
    return {
      success: false,
      isNetworkError: true,
      message: 'Could not connect to the backend server. Please verify your connection.'
    };
  }
};

/**
 * Get student profile and full progress by ID
 */
export const getUserProfileApi = async (userId) => {
  try {
    const response = await resilientFetch(`/user/profile/${userId}`, {
      method: 'GET'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API getUserProfile error:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Save brain game progress and personal best to MongoDB
 */
export const saveGameProgressApi = async (progressData) => {
  try {
    const response = await resilientFetch('/user/game-progress', {
      method: 'POST',
      body: JSON.stringify(progressData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API saveGameProgress error:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Save adaptive quiz result and score to MongoDB
 */
export const saveQuizProgressApi = async (quizData) => {
  try {
    const response = await resilientFetch('/user/quiz-progress', {
      method: 'POST',
      body: JSON.stringify(quizData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API saveQuizProgress error:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Update difficulty preference in MongoDB
 */
export const updateDifficultyApi = async (userId, difficulty) => {
  try {
    const response = await resilientFetch('/user/difficulty', {
      method: 'POST',
      body: JSON.stringify({ userId, difficulty })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API updateDifficulty error:', error);
    return { success: false, message: error.message };
  }
};
