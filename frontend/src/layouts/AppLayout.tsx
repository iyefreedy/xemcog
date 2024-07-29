import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { FaBars } from 'react-icons/fa6'
import { useLayout } from '@/hooks/useLayout'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { setLayoutState, layoutState, onMenuToggle } = useLayout()

    const sidebarRef = useRef<HTMLElement | null>(null)
    const navbarRef = useRef<HTMLElement | null>(null)
    const outsideClickListener = useRef<EventListener | null>(null)

    useEffect(() => {
        if (layoutState.staticMenuMobileActive) {
            bindOutsideClickListener()
        } else {
            unbindOutsideClickListener()
        }
    }, [layoutState.staticMenuMobileActive])

    const bindOutsideClickListener = () => {
        if (!outsideClickListener.current) {
            console.log('Binding click listener')
            outsideClickListener.current = (event) => {
                if (isOutsideClicked(event as PointerEvent)) {
                    setLayoutState({
                        ...layoutState,
                        staticMenuMobileActive: false,
                    })
                }
            }
            document.addEventListener('click', outsideClickListener.current)
        }
    }

    const unbindOutsideClickListener = () => {
        if (outsideClickListener.current) {
            console.log('Unbinding click listener')
            document.removeEventListener('click', outsideClickListener.current)
            outsideClickListener.current = null
        }
    }

    const sidebarClasses = twMerge(
        'absolute left-0 top-0 h-full w-[280px] -translate-x-full bg-white p-3 shadow-lg duration-300 transition-transform z-50 md:translate-x-0 md:top-24 md:left-4 rounded-xl md:h-[calc(100%_-_8rem)]',
        layoutState.staticMenuMobileActive && 'translate-x-0',
        layoutState.staticMenuDesktopInactive &&
            'md:-translate-x-full md:left-0'
    )

    const overlayClasses = twMerge(
        'absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 md:hidden',
        layoutState.staticMenuMobileActive ? 'block' : 'hidden'
    )

    const mainClasses = twMerge(
        'pt-24 px-6 md:ml-[calc(292px_+_2rem)] transition-[margin] duration-300',
        layoutState.staticMenuDesktopInactive && 'md:ml-0'
    )

    const isOutsideClicked = (event: PointerEvent) => {
        return !(
            sidebarRef.current?.contains(event.target as Node) ||
            sidebarRef.current?.isSameNode(event.target as Node) ||
            navbarRef.current?.contains(event.target as Node) ||
            navbarRef.current?.isSameNode(event.target as Node)
        )
    }

    return (
        <div className="h-screen">
            <nav
                ref={navbarRef}
                className="absolute left-0 top-0 h-[70px] w-full bg-white px-6 shadow-md"
            >
                <div className="flex h-full items-center justify-between">
                    <div className="flex">
                        <Link to="/" className="hidden md:mr-40 md:block">
                            <img src="/vite.svg" alt="Logo vite" />
                        </Link>

                        <button
                            type="button"
                            className="rounded-full p-1.5 transition-shadow focus:ring-2 focus:ring-gray-400"
                            onClick={onMenuToggle}
                        >
                            <FaBars className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </nav>
            <aside ref={sidebarRef} className={sidebarClasses}>
                <ul className="space-y-2.5 p-4">
                    <li>
                        <Link
                            to={'/dashboard'}
                            className="p-1.5 font-medium text-gray-600"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to={'/users'} className="p-1.5 font-medium">
                            Users
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className={mainClasses}>{children}</main>
            <div className={overlayClasses}></div>
        </div>
    )
}
