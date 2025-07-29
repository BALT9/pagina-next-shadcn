"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

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
import Step1 from "@/components/components-register/Step1"
import Step2 from "@/components/components-register/Step2"
import Step3 from "@/components/components-register/Step3"

const steps = [
  { id: 1, title: "Datos Personales" },
  { id: 2, title: "Datos Tienda" },
  { id: 3, title: "Servicios" },
]

export default function Page() {
  const { register, handleSubmit, reset } = useForm()
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const onSubmit = (data) => {
    console.log("Datos enviados:", data)
    alert("Formulario enviado correctamente")
    reset()
    setCurrentStep(1)
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <Step1 register={register} />
      case 2:
        return <Step2 register={register} />
      case 3:
        return <Step3 />
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
              <div className="flex flex-col gap-6">
                {renderStepContent(currentStep)}
              </div>
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
