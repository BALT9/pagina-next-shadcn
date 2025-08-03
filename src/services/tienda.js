// services/tiendas.js
import api from './axios';

export const createTiendaRequest = (tiendaData) => api.post('/tiendas', tiendaData);
