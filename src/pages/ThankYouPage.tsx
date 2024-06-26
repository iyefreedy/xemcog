import { Link } from "react-router-dom";

function ThankYouPage() {
	return (
		<div className="container mx-auto p-4">
			<header className="text-center my-8">
				<h1 className="text-4xl font-bold">Thank You!</h1>
			</header>
			<div className="text-left mt-8">
				<p className="mb-4">
					Thank you for participating in our experiment. Your responses have
					been recorded.
				</p>
				<p className="mb-4">
					We will process the data and publish the results in due time. Stay
					tuned for updates.
				</p>
			</div>
			<div className="text-center mt-8">
				<Link to="/">
					<button className="px-6 py-3 bg-blue-500 text-white rounded-full">
						Back to Home
					</button>
				</Link>
			</div>
		</div>
	);
}

export default ThankYouPage;
