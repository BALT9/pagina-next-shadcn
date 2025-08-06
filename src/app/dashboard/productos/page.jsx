"use client";
import { useEffect } from "react";
import { useProducto } from "@/context/ProductoContext"; // ajustá la ruta si es necesario

export default function Productos() {
  const { productos, loading, error, fetchProductos } = useProducto();

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  if (!productos.length) {
    return <p className="p-4 text-center text-gray-600">No tienes productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {productos.map((producto) => (
        <div
          key={producto._id}
          className="border rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{producto.title}</h2>
          <p className="text-gray-600 mb-4">{producto.description}</p>
          <p className="font-bold text-lg">${producto.price}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
}
