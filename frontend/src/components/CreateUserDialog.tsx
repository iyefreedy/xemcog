import { createUser } from '@/services/user'
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@headlessui/react'
import { FormEvent, FormEventHandler, useState } from 'react'

export const CreateUserDialog = ({
    isOpen,
    closeDialog,
}: {
    isOpen: boolean
    closeDialog: () => void
}) => {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const attemptCreateUser: FormEventHandler = (event: FormEvent) => {
        event.preventDefault()
        createUser({ fullname, email, password })
    }

    return (
        <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg space-y-4 border bg-white p-12">
                    <DialogTitle className="font-bold">
                        Create user account
                    </DialogTitle>
                    <Description>Create new user account</Description>
                    <form onSubmit={attemptCreateUser}>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="mb-1.5 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                className="w-full rounded border border-gray-300 p-1.5 outline-none transition-[color,_box-shadow] duration-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                                autoComplete="name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="mb-1.5 block">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded border border-gray-300 p-1.5 outline-none transition-[color,_box-shadow] duration-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded bg-emerald-500 p-2 text-white transition-shadow focus:ring-[3px] focus:ring-emerald-600"
                        >
                            Create
                        </button>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
