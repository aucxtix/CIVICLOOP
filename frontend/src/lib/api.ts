import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3000/api',
});

// Add a request interceptor to include auth token
api.interceptors.request.use((config) => {
  const authStore = localStorage.getItem('civicloop-auth');
  if (authStore) {
    try {
      const parsed = JSON.parse(authStore);
      if (parsed.state && parsed.state.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`;
      }
    } catch (e) {
      console.error('Failed to parse auth token', e);
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only intercept 401s if it's not the login request itself
    if (error.response?.status === 401 && !error.config.url?.includes('/auth/login')) {
      // Clear auth storage if session is invalid (e.g. user deleted or DB wiped)
      localStorage.removeItem('civicloop-auth');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
