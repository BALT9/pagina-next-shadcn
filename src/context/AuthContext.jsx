"use client"

import { getProfileRequest, loginRequest, registerRequest, logoutRequest } from "@/services/auth";
import { setAuthHeader } from "@/services/authHeader";
// import api from "@/services/axios";
import { useRouter } from "next/navigation";

const { createContext, useContext, useState } = require("react")


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe estar dentro del contexto');
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const registerA = async (userData) => {
        try {
            setLoading(true);
            const res = await registerRequest(userData);
            const token = res.data.access_token;
            localStorage.setItem('token', token);

            setAuthHeader(token);

            const profileRes = await getProfileRequest();
            setUser(profileRes.data);
            console.log(res.data);
            setIsAuthenticated(true);
            setErrors([]);
            router.push('/dashboard/inicio');

        } catch (error) {
            console.error(error.response?.data);
            setErrors([error.response?.data?.message || 'Error en registro']);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        try {
            const res = await loginRequest(userData)
            const token = res.data.access_token;
            localStorage.setItem('token', token);

            setAuthHeader(token);
            // console.log("Authorization header seteado:", api.defaults.headers.common['Authorization']);


            const profileRes = await getProfileRequest();
            setUser(profileRes.data);
            console.log(res.data);
            setIsAuthenticated(true);
            setErrors([]);
            router.push('/dashboard/inicio');

        } catch (error) {
            console.error(error.response.data)
            setErrors([error.response?.data?.message || 'Error en login'])
            setIsAuthenticated(false)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await logoutRequest(); // llama al backend para cerrar sesión
        } catch (error) {
            console.error("Error en logout:", error);
            // Podés manejar errores, o ignorarlos y seguir limpiando localmente
        } finally {
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
            router.push("/login");
        }
    };


    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            errors,
            registerA,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}