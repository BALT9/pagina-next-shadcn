"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form"

const steps = [
  { id: 1, title: "Datos Personales" },
  { id: 2, title: "Datos Tienda" },
  { id: 3, title: "Servicios" },
]


export default function Page() {
  const { register, handleSubmit } = useForm()

  const [currentStep, setCurrentStep] = useState(1)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  }

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const onSubmit = (data) => {
    console.log("Datos enviados:", data)
    alert("Formulario enviado correctamente")
    setCurrentStep(1)
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" placeholder="ana" {...register("name")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Email</Label>
              <Input type="email" placeholder="ana@example.com" />
            </div>
            <div className="flex w-full gap-4">
              <div className="flex-1 grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"

                />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar contraseña"

                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Age</Label>
              <Input type="number" placeholder="Number" min="1" />
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="phone">Name Market</Label>
              <Input placeholder="Tieda Amiga" />
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center py-0 px-4 min-h-0 sm:min-h-screen">
      <div className="w-full max-w-xl space-y-6">

        {/* Progress + Steps */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-200 rounded-full -z-10" />
          <div
            className="absolute top-1/3 left-0 h-2 bg-primary rounded-full -z-10 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
            }}
          />

          {/* Steps */}
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step) => {
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${isCompleted
                        ? "bg-primary text-white"
                        : isActive
                          ? "bg-primary text-white-600"
                          : "bg-gray-200 text-gray-600"}`}
                  >
                    {step.id}
                  </div>
                  {/* <span className={` mt-1 text-xs ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    {step.title}
                  </span> */}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>Paso {currentStep} de {steps.length}</CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => alert("Ir a crear cuenta")}>
                Ya tengo mi cuenta
              </Button>
            </CardAction>
          </CardHeader>

          <form onSubmit={handleSubmit((data) => {
            if (currentStep === steps.length) {
              onSubmit(data)
            } else {
              nextStep()
            }
          })}>
            <CardContent className="min-h-[300px]">
              <div className="flex flex-col gap-6">{renderStepContent(currentStep)}</div>
            </CardContent>

            <CardFooter className="flex justify-between mt-5">
              <Button
                className="px-10"
                variant="outline"
                onClick={prevStep}
                type="button"
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              <Button type="submit" className="px-10 cursor-pointer">
                {currentStep === steps.length ? "Enviar" : "Siguiente"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  )
}
