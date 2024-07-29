import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <header className="my-8 text-center">
                <h1 className="text-4xl font-bold">
                    Cognitive Linguistics Research
                </h1>
                <p className="mt-4 text-lg">
                    Welcome to our research experiment platform. Your
                    participation helps us understand how Indonesian grammar
                    influences semantic interpretation.
                </p>
            </header>
            <div className="mt-8 text-center">
                <Link
                    to="/instructions"
                    className="rounded-full bg-emerald-500 px-6 py-3 text-white"
                >
                    Get Started
                </Link>
            </div>
        </div>
    )
}
