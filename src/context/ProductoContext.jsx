"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { createProductoRequest, deleteProductoRequest, getProductoRequest, getProductosRequest, updateProductoRequest } from "@/services/producto";

const ProductoContext = createContext();

export const useProducto = () => useContext(ProductoContext);

export const ProductoProvider = ({ children }) => {
  const [producto, setProducto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await getProductosRequest();
      setProductos(res.data);
      console.log("producto"+res.data)
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error cargando productos");
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducto = async (id) => {
    setLoading(true);
    try {
      const res = await getProductoRequest(id);
      setProducto(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error cargando el producto");
      setProducto(null);
    } finally {
      setLoading(false);
    }
  };

  const createProducto = async (productoData) => {
    setLoading(true);
    try {
      const res = await createProductoRequest(productoData);
      setProductos((prev) => [...prev, res.data]);
      setProducto(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error creando el producto");
    } finally {
      setLoading(false);
    }
  };

  const updateProducto = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await updateProductoRequest(id, updatedData);
      setProducto(res.data);
      setProductos((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error actualizando el producto");
    } finally {
      setLoading(false);
    }
  };

  const deleteProducto = async (id) => {
    setLoading(true);
    try {
      await deleteProductoRequest(id);
      setProductos((prev) => prev.filter((p) => p._id !== id));
      if (producto?._id === id) setProducto(null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error eliminando el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        producto,
        productos,
        loading,
        error,
        fetchProductos,
        fetchProducto,
        createProducto,  // <-- ya disponible en cualquier componente
        updateProducto,
        deleteProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
