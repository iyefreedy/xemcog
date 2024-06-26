import { Link } from "react-router-dom"; // Assuming you use React Router for navigation

function LandingPage() {
	return (
		<div className="container mx-auto p-4">
			<header className="text-center my-8">
				<h1 className="text-4xl font-bold">Cognitive Linguistics Research</h1>
				<p className="mt-4 text-lg">
					Welcome to our research experiment platform. Your participation helps
					us understand how Indonesian grammar influences semantic
					interpretation.
				</p>
			</header>
			<div className="text-center mt-8">
				<Link to="/instructions">
					<button className="px-6 py-3 bg-blue-500 text-white rounded-full">
						Get Started
					</button>
				</Link>
			</div>
		</div>
	);
}

export default LandingPage;
