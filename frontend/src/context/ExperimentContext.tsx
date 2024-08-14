import { Experiment, Session } from "@/types";
import {
	createContext,
	FormEventHandler,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { AuthContext } from "@/context/AuthContext";
import API from "@/API";
import Konva from "konva";
import { dataURItoBlob } from "@/utils";
import { useNavigate } from "react-router-dom";

type ExperimentStep = "input" | "sketch" | "rate";

type ExperimentContextProps = {
	experiment: Experiment | undefined;
	step: ExperimentStep;
	repetition: number;
	input: string;
	rate: number;
	lines: number[][];
	session: Session | undefined;
	loading: boolean;
	stageRef: React.RefObject<Konva.Stage>;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	setLines: React.Dispatch<React.SetStateAction<number[][]>>;
	setRate: React.Dispatch<React.SetStateAction<number>>;
	handleSubmitWord: FormEventHandler<HTMLFormElement>;
	handleSubmitSketch: FormEventHandler<HTMLFormElement>;
	handleSubmitRate: FormEventHandler<HTMLFormElement>;
};

export const ExperimentContext = createContext<ExperimentContextProps>(
	{} as ExperimentContextProps
);

export const ExperimentProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useContext(AuthContext);

	const [experiment, setExperiment] = useState<Experiment>();
	const [session, setSession] = useState<Session>();

	const [repetition, setRepetition] = useState(0);
	const [input, setInput] = useState("");
	const [step, setStep] = useState<ExperimentStep>("input");
	const [rate, setRate] = useState(0);
	const [lines, setLines] = useState<number[][]>([]);
	const [loading, setLoading] = useState(false);

	const stageRef = useRef<Konva.Stage>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchExperiment = async () => {
			try {
				if (!user) return;
				const res = await API.startExperiment({
					user_id: user.user_id,
					start_time: new Date().toISOString(),
				});
				setExperiment(res.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchExperiment();
	}, []);

	const handleSubmitWord: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (!experiment) return;

		try {
			setLoading(true);
			const res = await API.startSession({
				word: input,
				experiment_id: experiment.experiment_id,
				start_time: new Date().toISOString(),
			});
			setSession(res.data);
			nextStep();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitSketch: FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();

		if (!session) return;

		try {
			const imageData = stageRef.current?.getStage().toDataURL();
			const blob = dataURItoBlob(imageData!);

			const formData = new FormData();
			formData.append("session_id", session.session_id.toString());
			formData.append("image", blob, Math.random() + ".jpg");

			await API.saveDrawing(formData);

			nextStep();
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmitRate: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (repetition <= 11) {
			try {
				await API.saveRating({
					rate: rate,
					session_id: session!.session_id,
				});
				await API.endSession({
					session_id: session!.session_id,
					end_time: new Date().toISOString(),
				});
				setRepetition((prevValue) => prevValue + 1);
				setStep("input");
				setLines([]);
				setInput("");
				setRate(0);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				await API.endExperiment({
					experiment_id: experiment!.experiment_id,
					end_time: new Date().toISOString(),
				});
				navigate("/thank-you");
			} catch (error) {
				console.error(error);
			}
		}
	};

	const nextStep = () => {
		setStep((prevStep) => {
			switch (prevStep) {
				case "input":
					return "sketch";
				case "sketch":
					return "rate";
				case "rate":
					return "input";
				default:
					return prevStep;
			}
		});
	};

	return (
		<ExperimentContext.Provider
			value={{
				experiment,
				step,
				input,
				repetition,
				session,
				stageRef,
				lines,
				rate,
				loading,
				setLines,
				setInput,
				setRate,
				handleSubmitWord,
				handleSubmitSketch,
				handleSubmitRate,
			}}
		>
			{children}
		</ExperimentContext.Provider>
	);
};
