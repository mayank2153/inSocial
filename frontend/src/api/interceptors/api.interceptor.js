import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000/',
  timeout: import.meta.env.REACT_APP_API_TIMEOUT ? parseInt(import.meta.env.REACT_APP_API_TIMEOUT, 10) : 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Preparation Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      handleTimeoutError(error);
    } else if (error.response) {
      switch (error.response.status) {
        case 400:
          handleBadRequest(error.response);
          break;
        case 401:
          return await handleUnauthorized(error);
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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

async function handleUnauthorized(error) {
  const originalRequest = error.config;

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return apiClient(originalRequest);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  isRefreshing = true;

  try {
    const response = await apiClient.post('/auth/refresh-token');
    const newAccessToken = response.data.accessToken;

    Cookies.set('accessToken', newAccessToken, { httpOnly: false, secure: true, sameSite: 'None' });

    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
    processQueue(null, newAccessToken);

    return apiClient(originalRequest);
  } catch (refreshError) {
    console.error('Token refresh failed:', refreshError);
    processQueue(refreshError, null);
    notifyError('Session expired. Please log in again.');
    window.location.href = '/auth/login';
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
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
