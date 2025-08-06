"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProducto } from "@/context/ProductoContext";

export default function ModalCrearProductoShadcn({
    onCreated,
    initialData = null,     // <-- Producto a editar (opcional)
    editMode = false,       // <-- ¿Está en modo edición?
    triggerLabel = "Agregar producto", // <-- Texto del botón
}) {
    const { createProducto, updateProducto } = useProducto(); // <-- Añadido updateProducto
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    // Rellenar datos en modo edición
    useEffect(() => {
        if (initialData) {
            Object.entries(initialData).forEach(([key, value]) => {
                if (value !== undefined) {
                    setValue(key, value);
                }
            });
        } else {
            reset();
        }
    }, [initialData, setValue, reset]);

    const onSubmit = async (data) => {
        try {
            data.stock = data.stock ? Number(data.stock) : 0;

            if (editMode && initialData?._id) {
                // Filtrar campos no permitidos
                const { _id, store, createdAt, updatedAt, __v, ...filteredData } = data;
                await updateProducto(initialData._id, filteredData);
                alert("Producto actualizado con éxito");
            } else {
                await createProducto(data);
                alert("Producto creado con éxito");
            }

            reset();
            setOpen(false);
            onCreated?.();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Ocurrió un error al guardar el producto.");
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className={editMode ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
                >
                    {editMode ? "Editar" : triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {editMode ? "Editar producto" : "Crear nuevo producto"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <Label htmlFor="title">Título *</Label>
                        <Input
                            id="title"
                            placeholder="Nombre del producto"
                            {...register("title", { required: "Título obligatorio" })}
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
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
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm">{errors.price.message}</p>
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
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-sm">{errors.stock.message}</p>
                        )}
                    </div>
                    <DialogFooter className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                reset();
                                setOpen(false);
                            }}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : editMode ? "Actualizar" : "Guardar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
