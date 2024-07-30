import { User } from '@/types'
import { createContext, useEffect, useState } from 'react'
import authService from '@/services/authService'
import { useLocation, useNavigate } from 'react-router-dom'

export interface AuthContextProps {
    isAuthenticated: boolean
    user: User | null
    handleLogin: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        authenticate()
    }, [])

    const authenticate = async () => {
        try {
            const currentUser = await authService.authenticate()
            setIsAuthenticated(true)
            setUser(currentUser as User)
            navigate(location.pathname)
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
            navigate('/login')
        }
    }

    const handleLogin = async () => {
        try {
            await authService.login({
                email: 'iye.fredickson@gmail.com',
                password: 'iye83616766',
            })
            const user = await authService.authenticate()
            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
