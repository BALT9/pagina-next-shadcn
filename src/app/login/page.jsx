"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { register, handleSubmit, reset } = useForm();
    const { login, errors, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.replace("/dashboard/inicio");
        }
    }, [loading, isAuthenticated, router]);

    const onSubmit = async (data) => {
        try {
            await login(data);
            alert("Login exitoso");
        } catch (error) {
            console.error("Error en login:", error);
            alert(error.message || "Ocurrió un error");
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <main className="flex min-h-[80vh] items-center justify-center py-0 px-4 min-h-0 sm:min-h-screen">
            <div className="w-full max-w-xl space-y-6">
                {/* Form Card */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Inicia Sesion</CardDescription>
                        <CardAction>
                            <Button variant="link" onClick={() => alert("Ir a crear cuenta")}>
                                No tengo una cuenta
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="min-h-[200px]">
                            <div className="flex flex-col gap-6 pt-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="ana@example.com"
                                        {...register("email")}
                                    />
                                </div>
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
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end mt-5">
                            <Button type="submit" className="px-10 cursor-pointer">
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
    );
}
