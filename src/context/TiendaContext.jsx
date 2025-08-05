"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getTiendaRequest, updateTiendaRequest } from "@/services/tienda";
import { useAuth } from "./AuthContext";

const TiendaContext = createContext();

export const useTienda = () => useContext(TiendaContext);

export const TiendaProvider = ({ children }) => {
  const { user } = useAuth();
  const [tienda, setTienda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTienda = async () => {
      if (user?.tienda) {
        setLoading(true);
        try {
          const res = await getTiendaRequest(user.tienda); // user.tienda es un string con el ID
          setTienda(res.data);
          console.log(res.data)
          setError(null);
        } catch (err) {
          setError("Error cargando la tienda");
          console.error(err);
          setTienda(null);
        } finally {
          setLoading(false);
        }
      } else {
        setTienda(null);
        setLoading(false);
      }
    };
    fetchTienda();
  }, [user]);

  const updateTiendaName = async (newName) => {
    if (!tienda) return;
    setLoading(true);
    try {
      const res = await updateTiendaRequest(tienda._id, { name: newName }); // ojo que el id puede ser _id
      setTienda(res.data);
      console.log(res)
      setError(null);
    } catch (err) {
      setError("Error actualizando la tienda");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TiendaContext.Provider value={{ tienda, loading, error, updateTiendaName }}>
      {children}
    </TiendaContext.Provider>
  );
};
