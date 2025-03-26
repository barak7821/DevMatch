import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean | null;
    setIsAuthenticated: (auth: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    setIsAuthenticated: () => { }
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setIsAuthenticated(false)
                return
            }

            try {
                const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setIsAuthenticated(response.data.exist)
            } catch (error) {
                console.error("Error in checkAuth:", error)
                setIsAuthenticated(false)
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)