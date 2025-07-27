"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check, User, MapPin, Settings, FileCheck } from "lucide-react"

const initialFormData = {
    // Paso 1: Información Personal
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Paso 2: Información de Contacto
    address: "",
    city: "",
    country: "",
    zipCode: "",

    // Paso 3: Preferencias
    interests: [],
    notifications: false,
    newsletter: false,
    bio: "",

    // Paso 4: Confirmación
    terms: false,
}

const steps = [
    {
        id: 1,
        title: "Información Personal",
        description: "Cuéntanos sobre ti",
        icon: User,
    },
    {
        id: 2,
        title: "Información de Contacto",
        description: "¿Dónde te ubicamos?",
        icon: MapPin,
    },
    {
        id: 3,
        title: "Preferencias",
        description: "Personaliza tu experiencia",
        icon: Settings,
    },
    {
        id: 4,
        title: "Confirmación",
        description: "Revisa y confirma",
        icon: FileCheck,
    },
]

const countries = [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "España",
    "México",
    "Perú",
    "Uruguay",
    "Venezuela",
]

const interestOptions = [
    "Tecnología",
    "Deportes",
    "Música",
    "Arte",
    "Viajes",
    "Cocina",
    "Lectura",
    "Fotografía",
    "Gaming",
    "Fitness",
]

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateStep = (step) => {
        const newErrors = {}

        switch (step) {
            case 1:
                if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido"
                if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
                if (!formData.email.trim()) newErrors.email = "El email es requerido"
                else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
                if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
                break

            case 2:
                if (!formData.address.trim()) newErrors.address = "La dirección es requerida"
                if (!formData.city.trim()) newErrors.city = "La ciudad es requerida"
                if (!formData.country) newErrors.country = "El país es requerido"
                if (!formData.zipCode.trim()) newErrors.zipCode = "El código postal es requerido"
                break

            case 3:
                if (formData.interests.length === 0) newErrors.interests = "Selecciona al menos un interés"
                break

            case 4:
                if (!formData.terms) newErrors.terms = "Debes aceptar los términos y condiciones"
                break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handleInterestChange = (interest, checked) => {
        if (checked) {
            updateFormData("interests", [...formData.interests, interest])
        } else {
            updateFormData(
                "interests",
                formData.interests.filter((i) => i !== interest),
            )
        }
    }

    const handleSubmit = () => {
        if (validateStep(4)) {
            console.log("Formulario enviado:", formData)
            alert("¡Formulario enviado exitosamente!")
        }
    }

    const progress = (currentStep / steps.length) * 100

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isActive = currentStep === step.id
                        const isCompleted = currentStep > step.id

                        return (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${isCompleted
                                            ? "bg-green-500 border-green-500 text-white"
                                            : isActive
                                                ? "bg-blue-500 border-blue-500 text-white"
                                                : "border-gray-300 text-gray-400"
                                        }
                `}
                                >
                                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`
                    w-16 h-0.5 mx-2 transition-colors
                    ${currentStep > step.id ? "bg-green-500" : "bg-gray-300"}
                  `}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                <Progress value={progress} className="mb-4" />

                <div className="text-center">
                    <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
                    <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Paso {currentStep} de {steps.length}
                    </CardTitle>
                    <CardDescription>Completa la información requerida para continuar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Paso 1: Información Personal */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nombre *</Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => updateFormData("firstName", e.target.value)}
                                        placeholder="Tu nombre"
                                        className={errors.firstName ? "border-red-500" : ""}
                                    />
                                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellido *</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => updateFormData("lastName", e.target.value)}
                                        placeholder="Tu apellido"
                                        className={errors.lastName ? "border-red-500" : ""}
                                    />
                                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData("email", e.target.value)}
                                    placeholder="tu@email.com"
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono *</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData("phone", e.target.value)}
                                    placeholder="+1 234 567 8900"
                                    className={errors.phone ? "border-red-500" : ""}
                                />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>
                    )}

                    {/* Paso 2: Información de Contacto */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección *</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => updateFormData("address", e.target.value)}
                                    placeholder="Calle, número, apartamento"
                                    className={errors.address ? "border-red-500" : ""}
                                />
                                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">Ciudad *</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) => updateFormData("city", e.target.value)}
                                        placeholder="Tu ciudad"
                                        className={errors.city ? "border-red-500" : ""}
                                    />
                                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">Código Postal *</Label>
                                    <Input
                                        id="zipCode"
                                        value={formData.zipCode}
                                        onChange={(e) => updateFormData("zipCode", e.target.value)}
                                        placeholder="12345"
                                        className={errors.zipCode ? "border-red-500" : ""}
                                    />
                                    {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">País *</Label>
                                <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                                    <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Selecciona tu país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                            </div>
                        </div>
                    )}

                    {/* Paso 3: Preferencias */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Intereses * (selecciona al menos uno)</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {interestOptions.map((interest) => (
                                        <div key={interest} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={interest}
                                                checked={formData.interests.includes(interest)}
                                                onCheckedChange={(checked) => handleInterestChange(interest, checked)}
                                            />
                                            <Label htmlFor={interest} className="text-sm font-normal">
                                                {interest}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.interests && <p className="text-sm text-red-500">{errors.interests}</p>}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="notifications"
                                        checked={formData.notifications}
                                        onCheckedChange={(checked) => updateFormData("notifications", checked)}
                                    />
                                    <Label htmlFor="notifications">Recibir notificaciones por email</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="newsletter"
                                        checked={formData.newsletter}
                                        onCheckedChange={(checked) => updateFormData("newsletter", checked)}
                                    />
                                    <Label htmlFor="newsletter">Suscribirse al newsletter</Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Biografía (opcional)</Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => updateFormData("bio", e.target.value)}
                                    placeholder="Cuéntanos un poco sobre ti..."
                                    rows={4}
                                />
                            </div>
                        </div>
                    )}

                    {/* Paso 4: Confirmación */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                <h3 className="font-semibold text-lg">Resumen de tu información</h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-medium">Información Personal</p>
                                        <p>
                                            {formData.firstName} {formData.lastName}
                                        </p>
                                        <p>{formData.email}</p>
                                        <p>{formData.phone}</p>
                                    </div>

                                    <div>
                                        <p className="font-medium">Dirección</p>
                                        <p>{formData.address}</p>
                                        <p>
                                            {formData.city}, {formData.zipCode}
                                        </p>
                                        <p>{formData.country}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-medium text-sm">Intereses</p>
                                    <p className="text-sm">{formData.interests.join(", ")}</p>
                                </div>

                                <div className="text-sm">
                                    <p>Notificaciones: {formData.notifications ? "Sí" : "No"}</p>
                                    <p>Newsletter: {formData.newsletter ? "Sí" : "No"}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.terms}
                                    onCheckedChange={(checked) => updateFormData("terms", checked)}
                                    className={errors.terms ? "border-red-500" : ""}
                                />
                                <Label htmlFor="terms" className="text-sm">
                                    Acepto los términos y condiciones y la política de privacidad *
                                </Label>
                            </div>
                            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
                        </div>
                    )}

                    {/* Botones de navegación */}
                    <div className="flex justify-between pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2 bg-transparent"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                        </Button>

                        {currentStep < steps.length ? (
                            <Button type="button" onClick={nextStep} className="flex items-center gap-2">
                                Siguiente
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button type="button" onClick={handleSubmit} className="flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Enviar Formulario
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
