import { Link } from 'react-router-dom'

function InstructionsPage() {
    return (
        <div className="container mx-auto p-4">
            <header className="my-8 text-center">
                <h1 className="text-4xl font-bold">Experiment Instructions</h1>
            </header>
            <div className="mt-8 text-left">
                <p className="mb-4">
                    Here are the instructions for the experiment:
                </p>
                <ol className="list-inside list-decimal">
                    <li>Read the stimuli carefully.</li>
                    <li>Provide your response in the input field.</li>
                    <li>Submit your response by clicking the submit button.</li>
                    <li>Repeat the process for all stimuli.</li>
                </ol>
            </div>
            <div className="mt-8 text-center">
                <Link to="/experiment">
                    <button className="rounded-full bg-emerald-500 px-6 py-3 text-white">
                        Start Experiment
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default InstructionsPage
