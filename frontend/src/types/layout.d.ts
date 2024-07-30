export type LayoutContextProps = {
    layoutState: LayoutState
    setLayoutState: React.Dispatch<React.SetStateAction<LayoutState>>
    onMenuToggle: () => void
}

export type LayoutState = {
    staticMenuMobileActive: boolean
    staticMenuDesktopInactive: boolean
}

type LayoutMenuMode = 'static' | 'overlay'
