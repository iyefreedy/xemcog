import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InstructionsPage from "./pages/InstructionsPage";
import ExperimentPage from "./pages/ExperimentPage";
import ThankYouPage from "./pages/ThankYouPage";
import "./index.css"; // Import TailwindCSS

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/instructions" element={<InstructionsPage />} />
				<Route path="/experiment" element={<ExperimentPage />} />
				<Route path="/thank-you" element={<ThankYouPage />} />
			</Routes>
		</Router>
	);
}

export default App;
