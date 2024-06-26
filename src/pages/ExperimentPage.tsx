import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { useNavigate } from "react-router-dom";
import Stopwatch from "../components/Stopwatch";

function ExperimentPage() {
	const navigate = useNavigate();
	const [currentStimulus, setCurrentStimulus] = useState(0);
	const canvasRef = useRef<CanvasDraw | null>(null);
	const stimuli = ["Anjing", "Apel", "Kucing"];

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		const drawingData = canvasRef?.current?.getSaveData();
		console.log("User response:", drawingData);
		// Save the drawing data and load the next stimulus
		// Here you would typically save the response to a server or local storage

		if (currentStimulus < stimuli.length - 1) {
			setCurrentStimulus(currentStimulus + 1);
			canvasRef?.current?.clear();
		} else {
			// All stimuli have been responded to, navigate to thank you page or end the experiment
			console.log("Experiment completed");
			// navigate to thank you page
			navigate("/thank-you");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<header className="text-center my-6">
				<h1 className="text-4xl font-bold">Experiment</h1>
			</header>
			<div className="text-left mt-6">
				<p className="mb-4">
					Please read the following stimulus and provide your response by
					drawing:
				</p>
				<p className="mb-4 font-semibold">{stimuli[currentStimulus]}</p>
				<form onSubmit={handleSubmit} className="flex flex-col items-center">
					<Stopwatch />

					<CanvasDraw
						ref={canvasRef}
						canvasWidth={750}
						canvasHeight={400}
						brushRadius={2}
						lazyRadius={0}
						className="border border-gray-300"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default ExperimentPage;
