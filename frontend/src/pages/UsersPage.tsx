import { CreateUserDialog } from '@/components/CreateUserDialog'
import { useFetchUsers } from '@/hooks/useFetchUser'
import AppLayout from '@/layouts/AppLayout'
import { useState } from 'react'

export default function UsersPage() {
    const { users, attemptCreateUser } = useFetchUsers()
    const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false)

    return (
        <AppLayout>
            <div className="rounded bg-white p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Users</h2>

                    <button
                        type="button"
                        className="rounded bg-emerald-500 p-1.5 text-sm text-gray-800"
                        onClick={() => setIsCreateUserDialogOpen(true)}
                    >
                        Create users
                    </button>
                </div>

                <div>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="border-b border-b-gray-400 px-3 py-1.5">
                                    Fullname
                                </th>
                                <th className="border-b border-b-gray-400 px-3 py-1.5">
                                    Email
                                </th>
                                <th className="border-b border-b-gray-400 px-3 py-1.5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="text-xs">
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateUserDialog
                isOpen={isCreateUserDialogOpen}
                onSave={attemptCreateUser}
                closeDialog={() => setIsCreateUserDialogOpen(false)}
            />
        </AppLayout>
    )
}
