import { LayoutState } from "@/types"
import { useEffect, useState } from "react"

export const useLayout = () => {
    const [layoutState, setLayoutState] = useState<LayoutState>({
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

    return {
        layoutState,
        setLayoutState,
        onMenuToggle
    }
}