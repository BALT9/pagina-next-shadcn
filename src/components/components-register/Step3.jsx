import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Step3() {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="servicePassword">Password</Label>
        <Input id="servicePassword" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="serviceConfirmPassword">Confirm Password</Label>
        <Input id="serviceConfirmPassword" />
      </div>
    </>
  )
}
