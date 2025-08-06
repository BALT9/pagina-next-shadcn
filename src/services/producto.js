import api from './axios';

// Crear un producto
export const createProductoRequest = (productoData) => api.post('/productos', productoData);

// Obtener todos los productos
export const getProductosRequest = () => api.get('/productos');

// Obtener un producto por ID
export const getProductoRequest = (id) => api.get(`/productos/${id}`);

// Actualizar un producto
export const updateProductoRequest = (id, productoData) => api.patch(`/productos/${id}`, productoData);

// Eliminar un producto
export const deleteProductoRequest = (id) => api.delete(`/productos/${id}`);
