import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Step2({ register }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="nombreTienda">Nombre de la Tienda</Label>
      <Input
        id="nombreTienda"
        placeholder="Tienda Amiga"
        {...register("nombreTienda", { required: true })}
      />
    </div>
  )
}
