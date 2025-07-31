// services/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // apunta a tu backend NestJS
  // Puedes agregar aquí headers comunes, interceptores, etc.
  // Por ejemplo, si usas token, agregarlo en headers Authorization
});

export default api;
