import { Experiment, Session } from "@/types";
import React, {
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

type ExperimentStep =
  | "input"
  | "sketch"
  | "rate"
  | "first-prime"
  | "second-prime"
  | "stimulus"
  | "sentence"
  | "finish"
  | "thankyou";

type ExperimentContextProps = {
  experiment: Experiment | undefined;
  step: ExperimentStep;
  repetition: number;
  input: string;
  sentence: string;
  rate: number;
  lines: number[][];
  session: Session | undefined;
  loading: boolean;
  stageRef: React.RefObject<Konva.Stage>;
  setStep: React.Dispatch<React.SetStateAction<ExperimentStep>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  setLines: React.Dispatch<React.SetStateAction<number[][]>>;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitWord: FormEventHandler<HTMLFormElement>;
  handleSubmitSketch: FormEventHandler<HTMLFormElement>;
  handleSubmitRate: FormEventHandler<HTMLFormElement>;
  handleSubmitSentence: FormEventHandler<HTMLFormElement>;
  startSession: () => void;
  nextSession: () => void;
  endExperiment: () => void;
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

  const [startTime, setStartTime] = useState(() => new Date().toISOString());

  const [repetition, setRepetition] = useState(0);
  const [input, setInput] = useState("");
  const [sentence, setSentence] = useState("");
  const [step, setStep] = useState<ExperimentStep>("first-prime");
  const [rate, setRate] = useState(0);
  const [lines, setLines] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        if (!user) return;
        const res = await API.startExperiment({
          user_id: user.id,
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
      await API.saveInputtedWord({
        input: input,
        session_id: session!.id,
        start_time: startTime,
        end_time: new Date().toISOString(),
      });
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
      formData.append("session_id", session.id.toString());
      formData.append("image", blob, Math.random() + ".jpg");

      await API.saveDrawing(formData);

      nextStep();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitRate: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      await API.saveRating({
        rate: rate,
        session_id: session!.id,
      });

      nextStep();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitSentence: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await API.saveInputtedSentence({
        sentence: sentence,
        session_id: session!.id,
        start_time: startTime,
        end_time: new Date().toISOString(),
      });

      nextStep();
    } catch (error) {
      console.error(error);
    }
  };

  const startSession = async () => {
    const res = await API.startSession({
      stimuli_id: user!.stimulis[repetition].id,
      experiment_id: experiment!.id,
      start_time: new Date().toISOString(),
    });

    setSession(res.data);
  };

  const nextSession = async () => {
    await API.endSession({
      session_id: session!.id,
      end_time: new Date().toISOString(),
    });

    setRepetition((prev) => prev + 1);
    setLines([]);
    setInput("");
    setSentence("");
    setRate(0);
    setStep("first-prime");
  };

  const nextStep = () => {
    setStep((prevStep) => {
      switch (prevStep) {
        case "first-prime":
          return "stimulus";
        case "stimulus":
          return "input";
        case "input":
          return "rate";
        case "rate":
          return "sketch";
        case "sketch":
          return "sentence";
        case "sentence":
          return "finish";
        default:
          return prevStep;
      }
    });
  };

  const endExperiment = async () => {
    try {
      await API.endExperiment({
        experiment_id: experiment!.id,
        end_time: new Date().toISOString(),
      });
      setStep("thankyou");
    } catch (error) {
      console.log(error);
    }
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
        sentence,
        setStep,
        setLines,
        setInput,
        setSentence,
        setRate,
        setStartTime,
        handleSubmitWord,
        handleSubmitSketch,
        handleSubmitRate,
        handleSubmitSentence,
        startSession,
        nextSession,
        endExperiment,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};
