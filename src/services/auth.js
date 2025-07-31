import api from './axios'; // instancia axios con baseURL='http://localhost:4000/api'

export const loginRequest = (user) => api.post('/auth/login', user);
export const registerRequest = (user) => api.post('/auth/register', user);
export const getProfileRequest = () => api.get('/auth/profile');
export const logoutRequest = () => api.post('/auth/logout');
