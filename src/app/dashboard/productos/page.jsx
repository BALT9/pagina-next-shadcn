"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProducto } from "@/context/ProductoContext";
import ModalCrearProductoShadcn from "@/components/components-dashboard/ModalProducto";

export default function Productos() {
  const { productos, loading, error, fetchProductos, createProducto, deleteProducto } = useProducto();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createProducto(data);
    reset();
    setModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen dark:bg-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mis productos</h1>
        {/* Modal incluye el botón para abrir */}
        <ModalCrearProductoShadcn onCreated={fetchProductos} />
      </div>

      {loading && <p className="text-gray-600 dark:text-gray-300">Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {productos.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No tienes productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 flex flex-col"
            >
              {/* Imagen del producto */}
              <img
                src={
                  producto.imageUrl?.trim()
                    ? producto.imageUrl
                    : "https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png"
                }
                alt={producto.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />


              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {producto.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{producto.description}</p>
              <p className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-6">
                ${producto.price}
              </p>

              <div className="mt-auto flex justify-end space-x-2">
                <ModalCrearProductoShadcn
                  editMode={true}
                  initialData={producto}
                  onCreated={fetchProductos}
                />
                <button
                  onClick={() => deleteProducto(producto._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
