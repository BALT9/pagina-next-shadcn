"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTienda } from "@/context/TiendaContext";
import { Button } from "@/components/ui/button";

export default function MiHotel() {
  const { tienda, loading, error, updateTiendaName } = useTienda();

  // Inicializa React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  // Cuando tienda cambia, resetear el formulario con el nombre actual
  useEffect(() => {
    if (tienda?.name) {
      reset({ name: tienda.name });
    }
  }, [tienda, reset]);

  const onSubmit = async (data) => {
    await updateTiendaName(data.name);
    alert("Nombre de la tienda actualizado");
  };

  if (loading) return <p>Cargando tienda...</p>;
  if (error) return <p>{error}</p>;
  if (!tienda) return <p>No tienes una tienda asociada.</p>;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl p-4">
          <h1>Tu Hotel</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="p-2 rounded border border-gray-300"
              placeholder="Nombre de la tienda"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}

            <Button
              type="submit"
              className="bg-red-400 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar nombre"}
            </Button>
          </form>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </>
  );
}
