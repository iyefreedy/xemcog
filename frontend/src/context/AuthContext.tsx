import { authenticate, login } from '@/services/auth'
import { User } from '@/types'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
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

    useEffect(() => {
        const authorize = async () => {
            try {
                const user = await authenticate()
                setIsAuthenticated(true)
                setUser(user.data as User)
            } catch (error) {
                setUser(null)
                setIsAuthenticated(false)
            }
        }

        authorize()
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])

    const handleLogin = () => {
        try {
            login({
                email: 'iye.fredickson@gmail.com',
                password: 'iye83616766',
            })
            setIsAuthenticated(true)
        } catch (error) {
            setIsAuthenticated(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
