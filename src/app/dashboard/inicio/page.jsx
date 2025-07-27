"use client"
import { Button } from "@/components/ui/button";

function Inicio() {
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" >
                    <h1>Bienvenido</h1>
                    <Button className="bg-red-400 cursor-pointer"><span onClick={() => { alert("Hola") }}>Click aqui...</span></Button>
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </>
    )
}

export default Inicio;