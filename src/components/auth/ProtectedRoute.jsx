"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
    console.log("ProtectedRoute - loading:", loading, "isAuthenticated:", isAuthenticated);

      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null; // Está redirigiendo, no renderiza nada
  }

  return <>{children}</>;
}
