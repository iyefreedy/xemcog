import { Link } from 'react-router-dom'

export default function ThankyouPage() {
    return (
        <header className="py-6 text-center">
            <h1>Thank you</h1>
            <p>Thanks for your participation with my research</p>
            <Link
                to={'/'}
                className="mt-4 inline-block rounded-full bg-emerald-500 px-4 py-2.5 text-sm text-slate-200 shadow"
            >
                Back to homepage
            </Link>
        </header>
    )
}
