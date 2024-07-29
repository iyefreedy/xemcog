import { LayoutContextProps, LayoutState } from '@/types'
import React, { createContext, useEffect } from 'react'

interface LayoutProviderProps {
    children: React.ReactNode
}

export const LayoutContext = createContext({} as LayoutContextProps)

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
    const [layoutState, setLayoutState] = React.useState<LayoutState>({
        staticMenuMobileActive: false,
        staticMenuDesktopInactive: false,
    })

    useEffect(() => {
        if (window.innerWidth > 768) {
            setLayoutState((prev) => ({
                ...prev,
                staticMenuDesktopInactive: false,
            }))
        } else {
            setLayoutState((prev) => ({
                ...prev,
                staticMenuMobileActive: false,
            }))
        }
    }, [window.innerWidth])

    const onMenuToggle = () => {
        if (isDesktop()) {
            setLayoutState((prev) => ({
                ...prev,
                staticMenuDesktopInactive: !prev.staticMenuDesktopInactive,
            }))
        } else {
            setLayoutState((prev) => ({
                ...prev,
                staticMenuMobileActive: !prev.staticMenuMobileActive,
            }))
        }
    }

    const isDesktop = () => window.innerWidth > 768

    return (
        <LayoutContext.Provider
            value={{
                layoutState,
                setLayoutState,
                onMenuToggle,
            }}
        >
            {children}
        </LayoutContext.Provider>
    )
}
