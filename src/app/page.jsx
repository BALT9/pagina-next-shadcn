"use client"

import { ModeToggle } from "@/components/interuptor"
import { Button } from "@/components/ui/button"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header con Menú */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-slate-900">
                MiEmpresa
              </Link>
            </div>

            {/* Menú Desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#inicio" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Inicio
              </Link>
              <Link href="#servicios" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Servicios
              </Link>
              <Link href="#productos" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Productos
              </Link>
              <Link href="#nosotros" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Nosotros
              </Link>
              <Link href="/register" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Contacto
              </Link>
            </nav>

            {/* Botones Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-primary rounded-md">
                <ModeToggle />
              </div>
              <Link href={"/login"} variant="ghost" className="text-slate-700 hover:text-slate-900">
                Iniciar Sesión
              </Link>
              <Link href={"/register"}>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">Registrarse</Button>
              </Link>
            </div>

            {/* Botón Menú Mobile */}
            <button
              className="md:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menú Mobile */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col space-y-4">
                <Link href="#inicio" className="text-slate-700 hover:text-slate-900 font-medium px-2 py-1" onClick={() => setIsMenuOpen(false)}>
                  Inicio
                </Link>
                <Link href="#servicios" className="text-slate-700 hover:text-slate-900 font-medium px-2 py-1" onClick={() => setIsMenuOpen(false)}>
                  Servicios
                </Link>
                <Link href="#productos" className="text-slate-700 hover:text-slate-900 font-medium px-2 py-1" onClick={() => setIsMenuOpen(false)}>
                  Productos
                </Link>
                <Link href="#nosotros" className="text-slate-700 hover:text-slate-900 font-medium px-2 py-1" onClick={() => setIsMenuOpen(false)}>
                  Nosotros
                </Link>
                <Link href="#contacto" className="text-slate-700 hover:text-slate-900 font-medium px-2 py-1" onClick={() => setIsMenuOpen(false)}>
                  Contacto
                </Link>

                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="justify-start text-slate-700 hover:text-slate-900 w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="justify-start bg-slate-900 hover:bg-slate-800 text-white w-full">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}

        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido del Hero */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Transforma tu{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    negocio
                  </span>{" "}
                  con nosotros
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Ofrecemos soluciones innovadoras y personalizadas que impulsan el crecimiento de tu empresa. Únete a
                  miles de clientes satisfechos que ya confían en nosotros.
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg">
                  Comenzar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg bg-transparent"
                >
                  Ver Demo
                </Button>
              </div>

              {/* Estadísticas */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">10K+</div>
                  <div className="text-sm text-slate-600">Clientes Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">99%</div>
                  <div className="text-sm text-slate-600">Satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-600">Soporte</div>
                </div>
              </div>
            </div>

            {/* Imagen del Hero */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://cdn3d.iconscout.com/3d/free/thumb/free-vuejs-4387636-3640297.png?f=webp"
                  alt="Dashboard de la aplicación"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Sección de Características */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué elegirnos?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Descubre las ventajas que nos hacen la mejor opción para tu negocio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Innovación</h3>
                <p className="text-slate-600">
                  Utilizamos las últimas tecnologías para ofrecerte soluciones de vanguardia
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Confiabilidad</h3>
                <p className="text-slate-600">Garantizamos un servicio estable y seguro las 24 horas del día</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Soporte</h3>
                <p className="text-slate-600">Nuestro equipo de expertos está siempre disponible para ayudarte</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
