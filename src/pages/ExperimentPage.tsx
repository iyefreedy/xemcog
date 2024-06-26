import React, { useState, useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useNavigate } from "react-router-dom";
import Stopwatch from "../components/Stopwatch";

function ExperimentPage() {
	const navigate = useNavigate();
	const [currentStimulus, setCurrentStimulus] = useState(0);
	const stimuli = ["Anjing", "Apel", "Kucing"];

	const canvasRef = useRef<ReactSketchCanvasRef>(null);
	const [eraseMode, setEraseMode] = useState(false);
	const [strokeWidth, setStrokeWidth] = useState(5);
	const [eraserWidth, setEraserWidth] = useState(10);
	const [strokeColor, setStrokeColor] = useState("#000000");
	const [canvasColor, setCanvasColor] = useState("#ffffff");

	const handleStrokeColorChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setStrokeColor(event.target.value);
	};

	const handleCanvasColorChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCanvasColor(event.target.value);
	};

	const handleEraserClick = () => {
		setEraseMode(true);
		canvasRef.current?.eraseMode(true);
	};

	const handlePenClick = () => {
		setEraseMode(false);
		canvasRef.current?.eraseMode(false);
	};

	const handleStrokeWidthChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setStrokeWidth(+event.target.value);
	};

	const handleEraserWidthChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setEraserWidth(+event.target.value);
	};

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		const drawingData = canvasRef?.current?.getSketchingTime();
		console.log("User response:", drawingData);
		// Save the drawing data and load the next stimulus
		// Here you would typically save the response to a server or local storage

		if (currentStimulus < stimuli.length - 1) {
			setCurrentStimulus(currentStimulus + 1);
			canvasRef?.current?.resetCanvas();
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

				<div className="flex gap-2 justify-center items-center ">
					<button
						type="button"
						className="btn btn-sm btn-outline-primary"
						disabled={!eraseMode}
						onClick={handlePenClick}
					>
						Pen
					</button>
					<button
						type="button"
						className="btn btn-sm btn-outline-primary"
						disabled={eraseMode}
						onClick={handleEraserClick}
					>
						Eraser
					</button>
					<label htmlFor="strokeWidth" className="form-label">
						Stroke width
					</label>
					<input
						disabled={eraseMode}
						type="range"
						className="form-range"
						min="1"
						max="20"
						step="1"
						id="strokeWidth"
						value={strokeWidth}
						onChange={handleStrokeWidthChange}
					/>
					<label htmlFor="eraserWidth" className="form-label">
						Eraser width
					</label>
					<input
						disabled={!eraseMode}
						type="range"
						className="form-range"
						min="1"
						max="20"
						step="1"
						id="eraserWidth"
						value={eraserWidth}
						onChange={handleEraserWidthChange}
					/>
					<label htmlFor="color">Stroke color</label>
					<input
						type="color"
						value={strokeColor}
						onChange={handleStrokeColorChange}
					/>
					<label htmlFor="color">Canvas color</label>
					<input
						type="color"
						value={canvasColor}
						onChange={handleCanvasColorChange}
					/>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col items-center">
					<Stopwatch />

					<ReactSketchCanvas
						ref={canvasRef}
						strokeWidth={strokeWidth}
						eraserWidth={eraserWidth}
						strokeColor={strokeColor}
						canvasColor={canvasColor}
						height="600px"
						withTimestamp
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
