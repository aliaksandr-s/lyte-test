import axios from 'axios';
import { retriveAuth } from './auth';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

// Events
export const getEvents = (limit = 10, offset = 0) =>
  axios.get(`/events/?limit=${limit}&offset=${offset}`);

export const getEvent = (id) =>
  axios.get(`/events/${id}`);

// Auth
export const register = (email, password) =>
  axios.post('/users/register', { email, password });

export const login = (username, password) =>
  axios.post('/users/token/', { username, password });

// Categories
export const getCategories = (limit = 0, offset = 0) =>
  axios.get(`/categories/?limit=${limit}&offset=${offset}`);

export const updateCategorie = (id, value) =>
  axios.patch(`/categories/${id}`,
    { name: value },
    { headers: { 'Authorization': `Token ${retriveAuth()}` } })
