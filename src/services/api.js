// Learning Acceleration API Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Register a student into MongoDB database via backend API
 * @param {Object} studentData - { name, email, age, class, password }
 */
export const registerStudentApi = async (studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
      message: 'Could not connect to the backend server. Please make sure the backend is running on port 5000.'
    };
  }
};

/**
 * Sign in student by checking credentials in MongoDB database
 * @param {string} email 
 * @param {string} password 
 */
export const loginStudentApi = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
      message: 'Could not connect to the backend server. Please make sure the backend is running on port 5000.'
    };
  }
};
