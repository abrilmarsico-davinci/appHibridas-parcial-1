import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () =>
    api.get('/auth/me')
};

export const genresAPI = {
  getAll: () => api.get('/genres'),
  getById: (id) => api.get(`/genres/${id}`),
  create: (data) => api.post('/genres', data),
  update: (id, data) => api.put(`/genres/${id}`, data),
  delete: (id) => api.delete(`/genres/${id}`)
};

export const moviesAPI = {
  getAll: () => api.get('/movies'),
  getById: (id) => api.get(`/movies/${id}`),
  create: (data) => api.post('/movies', data),
  update: (id, data) => api.put(`/movies/${id}`, data),
  delete: (id) => api.delete(`/movies/${id}`)
};

export default api;
