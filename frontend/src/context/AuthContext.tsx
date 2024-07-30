import { CredentialInfo, User } from '@/types'
import { createContext, useEffect, useState } from 'react'
import authService from '@/services/authService'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export interface AuthContextProps {
    isAuthenticated: boolean
    user: User | null
    handleLogin: (crendential: CredentialInfo) => void
    error: string | null
    loading: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        authenticate()
    }, [])

    const authenticate = async () => {
        try {
            setLoading(true)
            const currentUser = await authService.authenticate()
            setIsAuthenticated(true)
            setUser(currentUser as User)
            navigate(location.pathname)
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
            navigate('/login')
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (credential: CredentialInfo) => {
        try {
            setLoading(true)
            await authService.login(credential)
            const user = await authService.authenticate()
            setError('')
            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            const e = error as AxiosError
            console.log(e.response?.data)
            setError((e.response?.data as any).message)
            setUser(null)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, handleLogin, isAuthenticated, error, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}
