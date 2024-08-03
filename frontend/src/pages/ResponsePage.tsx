import AppLayout from '@/layouts/AppLayout'

export default function ResponsePage() {
    return (
        <AppLayout>
            <div className="rounded bg-white p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Users</h2>
                </div>

                <div>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="border-b border-b-gray-400 px-3 py-1.5 text-start">
                                    Fullname
                                </th>
                                <th className="border-b border-b-gray-400 px-3 py-1.5 text-start">
                                    Email
                                </th>
                                <th className="border-b border-b-gray-400 px-3 py-1.5 text-start"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}
