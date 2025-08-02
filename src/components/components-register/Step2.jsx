import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Step2({ register }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="market">Name Market</Label>
      <Input placeholder="Tienda Amiga" />
    </div>
  )
}
