import { useContext, useEffect, useRef, useState } from "react";
import { Layer, Stage, Line } from "react-konva";
import { KonvaPointerEvent } from "konva/lib/PointerEvents";
import { ExperimentContext } from "@/context/ExperimentContext";
import { AuthContext } from "@/context/AuthContext";

export default function UserExperimentPage() {
	const { step, loading } = useContext(ExperimentContext);

	const { user } = useContext(AuthContext);
	const [secondsLeft, setSecondsLeft] = useState(3); // Mulai dari 3 detik
	const [isTimeout, setIsTimeout] = useState(false);

	useEffect(() => {

		const timer = setInterval(() => {
			setSecondsLeft((prevSeconds) => prevSeconds - 1);
		}, 1000); // Kurangi setiap detik

		const redirectTimeout = setTimeout(() => {
			setIsTimeout(true);
		}, 3000); // Pengalihan setelah 3 detik

		// Bersihkan interval dan timeout ketika komponen dibongkar
		return () => {
			clearInterval(timer);
			clearTimeout(redirectTimeout);
		};

	}, []);

	if (loading) {
		return <div className="p-10 text-center">Loading...</div>
	}

	if (!isTimeout) {
		console.log(isTimeout)
		return (
			<div className="container mt-6 text-center">
				<p>Mengarahkan dalam {secondsLeft} detik...</p>
				<p>Kata Semantik: {user?.stimuli_word}</p>
			</div>
		);
	}

	return (
		<div>
			{step === "input" && <InputStep />}
			{step === "sketch" && <SketchStep />}
			{step === "rate" && <RateStep />}

		</div>
	);
}

const InputStep = () => {
	const { user } = useContext(AuthContext);
	const { handleSubmitWord, input, setInput, session, repetition } =
		useContext(ExperimentContext);

	return (
		<div className="container pt-10">
			<div className="text-center max-w-md mx-auto">
				{repetition > 0 && session && (
					<>
						<h1 className="text-2xl font-bold">
							Kata/Kalimat Sebelumnya: {session.word}
						</h1>
						<h2 className="text-xl font-semibold">Kata Stimuli: {user?.stimuli_word}</h2>
					</>

				)}
				<form onSubmit={handleSubmitWord}>
					<div className="mb-3">
						<label htmlFor="word">Masukkan Kata Stimuli</label>
						<input
							type="text"
							className="w-full px-2.5 mt-1.5 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-shadow text-center"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 bg-green-400 rounded-lg text-gray-800 font-medium border-2 border-green-400 active:border-green-700"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

const SketchStep = () => {

	const { lines, setLines, handleSubmitSketch, stageRef, loading } =
		useContext(ExperimentContext);

	const isDrawing = useRef(false);

	const handleMouseDown = (e: KonvaPointerEvent) => {
		isDrawing.current = true;
		const pos = e.target.getStage()!.getPointerPosition()!;
		setLines([...lines, [pos.x, pos?.y]]);
	};

	const handleMouseMove = (e: KonvaPointerEvent) => {
		// no drawing - skipping
		if (!isDrawing.current) {
			return;
		}
		const stage = e.target.getStage();
		const point = stage?.getPointerPosition();
		let lastLine = lines[lines.length - 1];
		// add point
		lastLine = lastLine.concat([point!.x, point!.y]);

		// replace last
		lines.splice(lines.length - 1, 1, lastLine);
		setLines(lines.concat());
	};

	const handleMouseUp = () => {
		isDrawing.current = false;
	};

	if (loading) {
		return <p className="text-center">Loading...</p>;
	}

	return (
		<form className="px-4 pt-10" onSubmit={handleSubmitSketch}>
			<button type="submit">Submit</button>
			<Stage
				ref={stageRef}
				onPointerDown={handleMouseDown}
				onPointerMove={handleMouseMove}
				onPointerUp={handleMouseUp}
				width={window.innerWidth}
				height={500}
				className="touch-none overflow-hidden rounded-md border-4 border-gray-500"
			>
				<Layer>
					{lines.map((line, i) => (
						<Line
							key={i}
							points={line}
							stroke={"#000"}
							tension={0.5}
							lineCap="round"
							lineJoin="round"
						/>
					))}
				</Layer>
			</Stage>
		</form>
	);
};

const RateStep = () => {
	const { rate, setRate, handleSubmitRate } = useContext(ExperimentContext);
	return (
		<div className="container pt-10">
			<div className="text-center max-w-md mx-auto">
				<form onSubmit={handleSubmitRate}>
					<div className="mb-3">
						<label htmlFor="word">Masukkan Kata Stimuli</label>
						<input
							type="number"
							className="w-full px-2.5 mt-1.5 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-shadow text-center"
							min={0}
							max={5}
							step={1}
							value={rate}
							onChange={(e) => setRate(parseInt(e.target.value))}
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 bg-green-400 rounded-lg text-gray-800 font-medium border-2 border-green-400 active:border-green-700"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
