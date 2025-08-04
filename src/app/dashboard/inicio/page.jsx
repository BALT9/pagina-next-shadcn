"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ShoppingBasket } from "lucide-react";

function Inicio() {
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {/* Card de Productos */}
                <Card className="aspect-video group hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-muted bg-background">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-lg font-semibold">Productos</CardTitle>
                            <CardDescription>Total de productos registrados</CardDescription>
                        </div>
                        <ShoppingBasket className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-4xl font-bold text-foreground">128</div>
                    </CardContent>
                </Card>

                {/* Placeholders */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <Card className="aspect-video group hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-muted bg-background">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-lg font-semibold">Productos</CardTitle>
                                <CardDescription>Total de productos registrados</CardDescription>
                            </div>
                            <ShoppingBasket className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-4xl font-bold text-foreground">128</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <Card className="aspect-video group hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-muted bg-background">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-lg font-semibold">Productos</CardTitle>
                                <CardDescription>Total de productos registrados</CardDescription>
                            </div>
                            <ShoppingBasket className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-4xl font-bold text-foreground">128</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </>
    );
}

export default Inicio;
