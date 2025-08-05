export default function Productos() {
  const productos = [
    { id: 1, nombre: "Producto A", descripcion: "Descripción del producto A", precio: 100 },
    { id: 2, nombre: "Producto B", descripcion: "Descripción del producto B", precio: 200 },
    { id: 3, nombre: "Producto C", descripcion: "Descripción del producto C", precio: 300 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {productos.map(producto => (
        <div key={producto.id} className="border rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
          <p className="text-gray-600 mb-4">{producto.descripcion}</p>
          <p className="font-bold text-lg">${producto.precio}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
}
