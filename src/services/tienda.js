// services/tiendas.js
import api from './axios';

// Crear una tienda
export const createTiendaRequest = (tiendaData) => api.post('/tiendas', tiendaData);

// Obtener todas las tiendas
export const getTiendasRequest = () => api.get('/tiendas');

// Obtener una tienda por ID
export const getTiendaRequest = (id) => api.get(`/tiendas/${id}`);

// Actualizar una tienda
export const updateTiendaRequest = (id, tiendaData) => api.patch(`/tiendas/${id}`, tiendaData);

// Eliminar una tienda
export const deleteTiendaRequest = (id) => api.delete(`/tiendas/${id}`);
