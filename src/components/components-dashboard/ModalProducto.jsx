"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProducto } from "@/context/ProductoContext";

export default function ModalCrearProductoShadcn({ onCreated }) {
  const { createProducto } = useProducto();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Asegura stock sea número y no negativo
      data.stock = data.stock ? Number(data.stock) : 0;

      // Crear producto
      await createProducto(data);

      alert("Producto creado con éxito!");

      reset();
      setOpen(false);

      if (onCreated) onCreated();
    } catch (error) {
      console.error("Error creando producto:", error);
      alert("Hubo un error al crear el producto.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          aria-label="Agregar nuevo producto"
        >
          Agregar producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" aria-modal="true" role="dialog">
        <DialogHeader>
          <DialogTitle>Crear nuevo producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Nombre del producto"
              {...register("title", { required: "Título obligatorio" })}
              disabled={isSubmitting}
              aria-invalid={errors.title ? "true" : "false"}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p className="text-red-500 text-sm" id="title-error" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción del producto"
              {...register("description")}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="price">Precio *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price", {
                required: "Precio obligatorio",
                min: { value: 0, message: "Debe ser ≥ 0" },
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              aria-invalid={errors.price ? "true" : "false"}
              aria-describedby={errors.price ? "price-error" : undefined}
            />
            {errors.price && (
              <p className="text-red-500 text-sm" id="price-error" role="alert">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="imageUrl">URL Imagen</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/imagen.jpg"
              {...register("imageUrl")}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              {...register("stock", {
                min: { value: 0, message: "Debe ser ≥ 0" },
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              aria-invalid={errors.stock ? "true" : "false"}
              aria-describedby={errors.stock ? "stock-error" : undefined}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm" id="stock-error" role="alert">
                {errors.stock.message}
              </p>
            )}
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              aria-label="Cancelar creación de producto"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} aria-label="Guardar producto">
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
