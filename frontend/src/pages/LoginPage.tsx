import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Credential = {
    email: string
    password: string
}

export default function LoginPage() {
    const [credential, setCredential] = useState<Credential>({
        email: '',
        password: '',
    })
    const { isAuthenticated, handleLogin } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const attemptLogin: React.FormEventHandler = (event) => {
        event.preventDefault()
        handleLogin()
    }

    return (
        <div className="flex h-screen items-center justify-center p-6">
            <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
                <h1 className="mb-4 text-center text-2xl font-bold">
                    Login Here
                </h1>

                <form onSubmit={attemptLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="mb-1.5 block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full rounded border border-gray-300 p-1.5 outline-none transition-[color,_box-shadow] duration-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                            autoComplete="email"
                            value={credential.email}
                            onChange={(e) =>
                                setCredential((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="mb-1.5 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full rounded border border-gray-300 p-1.5 outline-none transition-[color,_box-shadow] duration-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                            autoComplete="current-password"
                            value={credential.password}
                            onChange={(e) =>
                                setCredential((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-emerald-500 p-2 text-white transition-shadow focus:ring-[3px] focus:ring-emerald-600"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}
