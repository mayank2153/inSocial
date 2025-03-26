import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000/',
  timeout: process.env.REACT_APP_API_TIMEOUT ? parseInt(process.env.REACT_APP_API_TIMEOUT, 10) : 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Request Interceptor:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error('Request Preparation Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Response Interceptor:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      handleTimeoutError(error);
    } else if (error.response) {
      switch (error.response.status) {
        case 400:
          handleBadRequest(error.response);
          break;
        case 401:
          handleUnauthorized(error.response);
          break;
        case 403:
          handleForbidden(error.response);
          break;
        case 404:
          handleNotFound(error.response);
          break;
        case 500:
          handleServerError(error.response);
          break;
        default:
          handleUnknownError(error.response);
      }
    } else if (error.request) {
      handleNetworkError(error);
    } else {
      handleRequestSetupError(error);
    }

    return Promise.reject(error);
  }
);

function handleBadRequest(response) {
  const errorMessage = response.data.message || 'Bad Request';
  notifyError(errorMessage);
}

function handleUnauthorized(response) {
  localStorage.removeItem('auth_token');

  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }

  notifyError('Session expired. Please log in again.');
}

function handleForbidden(response) {
  notifyError('You do not have permission to perform this action.');
}

function handleNotFound(response) {
  notifyError('The requested resource was not found.');
}

function handleServerError(response) {
  notifyError('An internal server error occurred. Please try again later.');
}

function handleUnknownError(response) {
  notifyError('An unexpected error occurred.');
}

function handleNetworkError(error) {
  notifyError('No internet connection. Please check your network.');
}

function handleRequestSetupError(error) {
  notifyError('Error setting up the request. Please try again.');
}

function handleTimeoutError(error) {
  notifyError('Request timed out. Please try again.');
}

function notifyError(message) {
  toast.error(message, { position: 'top-right', autoClose: 5000 });
}

export const ApiService = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
};

export default apiClient;
