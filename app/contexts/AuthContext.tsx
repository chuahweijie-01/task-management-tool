'use client'

import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
        router.push('/task')
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}