import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Step1({ register }) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input placeholder="ana" id="name" {...register("name")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">Email</Label>
        <Input type="email" placeholder="ana@example.com" {...register("email")} />
      </div>
      <div className="flex w-full gap-4">
        <div className="flex-1 grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            {...register("password")}
          />
        </div>
        <div className="flex-1 grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
          // {...register("cpassword")}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          placeholder="Number"
          min="1"
          {...register("age", { valueAsNumber: true })}
        />

      </div>
    </>
  )
}
