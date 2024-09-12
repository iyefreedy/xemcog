import React, { useContext, useEffect, useRef, useState } from "react";
import { Layer, Stage, Line } from "react-konva";
import { KonvaPointerEvent } from "konva/lib/PointerEvents";
import { ExperimentContext } from "@/context/ExperimentContext";
import { AuthContext } from "@/context/AuthContext";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function UserExperimentPage() {
  const { step } = useContext(ExperimentContext);

  return (
    <div>
      {step === "prime" && <PrimeStep />}
      {step === "stimulus" && <StimulusStep />}
      {step === "input" && <InputStep />}
      {step === "sentence" && <SentenceStep />}
      {step === "sketch" && <SketchStep />}
      {step === "rate" && <RateStep />}
      {step === "finish" && <FinishStep />}
    </div>
  );
}

const PrimeStep = () => {
  const { setStep } = useContext(ExperimentContext);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setStep("stimulus");
    }, 5000); // Pengalihan setelah 3 detik

    // Bersihkan interval dan timeout ketika komponen dibongkar
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <PlusIcon className="w-40 h-40" />
    </div>
  );
};

const StimulusStep = () => {
  const [secondsLeft, setSecondsLeft] = useState(3); // Mulai dari 3 detik

  const { user } = useContext(AuthContext);
  const { setStep, repetition, startSession } = useContext(ExperimentContext);

  useEffect(() => {
    startSession();

    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000); // Kurangi setiap detik

    const redirectTimeout = setTimeout(() => {
      setStep("input");
    }, 3000); // Pengalihan setelah 3 detik

    // Bersihkan interval dan timeout ketika komponen dibongkar
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-4xl font-bold">{user?.stimulis[repetition].word}</p>
    </div>
  );
};

const InputStep = () => {
  const [isFirstChange, setIsFirstChange] = useState(false);
  const { handleSubmitWord, input, setInput, setStartTime } =
    useContext(ExperimentContext);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);

    // Trigger proses hanya pada perubahan pertama
    if (!isFirstChange) {
      setStartTime(new Date().toISOString());
      setIsFirstChange(true); // Set flag bahwa perubahan pertama sudah terjadi
    }
  };

  return (
    <div className="container pt-10">
      <div className="text-center max-w-md mx-auto">
        <form onSubmit={handleSubmitWord}>
          <div className="mb-3">
            <label htmlFor="word">Masukkan Kata Stimuli</label>
            <input
              type="text"
              className="w-full px-2.5 mt-1.5 py-1.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-shadow text-center"
              value={input}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-green-400 text-white py-1.5 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const SentenceStep = () => {
  const [isFirstChange, setIsFirstChange] = useState(false);
  const { setSentence, sentence, handleSubmitSentence, setStartTime } =
    useContext(ExperimentContext);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setSentence(e.target.value);

    // Trigger proses hanya pada perubahan pertama
    if (!isFirstChange) {
      setStartTime(new Date().toISOString());
      setIsFirstChange(true); // Set flag bahwa perubahan pertama sudah terjadi
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form onSubmit={handleSubmitSentence}>
        <div className="mb-3">
          <label htmlFor="sentence" className="block">
            Buat kalimat dari kata tersebut!
          </label>
          <textarea
            id="sentence"
            className="block w-full outline-none focus:ring-2 focus:ring-green-400 p-2 rounded-md"
            value={sentence}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="block w-full bg-green-400 text-white py-1.5 rounded-md">
          Submit
        </button>
      </form>
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
  const { setRate, handleSubmitRate } = useContext(ExperimentContext);
  return (
    <div className="container pt-10">
      <div className="text-center mx-auto min-w-80">
        <form onSubmit={handleSubmitRate}>
          <div className="mb-3">
            <label htmlFor="word" className="mb-3 block">
              Seberapa familiar anda dengan kata tersebut?
            </label>
            <div className="w-full flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  id="notFamiliarRate"
                  type="radio"
                  name="familiar"
                  value={1}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <label htmlFor="notFamiliarRate">Tidak Familiar</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="lessFamiliarRate"
                  type="radio"
                  name="familiar"
                  value={2}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <label htmlFor="lessFamiliarRate">Kurang Familiar</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="seemsFamiliarRate"
                  type="radio"
                  name="familiar"
                  value={3}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <label htmlFor="seemsFamiliarRate">Cukup Familiar</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="familiarRate"
                  type="radio"
                  name="familiar"
                  value={4}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <label htmlFor="familiarRate">Familiar</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="veryFamiliarRate"
                  type="radio"
                  name="familiar"
                  value={5}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <label htmlFor="veryFamiliarRate">Sangat Familiar</label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full bg-green-400 text-white py-1.5 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const FinishStep = () => {
  const { nextSession, repetition, endExperiment } =
    useContext(ExperimentContext);
  const { user } = useContext(AuthContext);

  if (user !== null && repetition === 11) {
    return (
      <div className="mt-10 text-center">
        <p>
          Anda telah menyelesaikan semua eksperimen. Terima kasih atas
          partisipasi anda.
        </p>
        <p>Klik "selesai".</p>
        <button onClick={endExperiment}>Selesai</button>
      </div>
    );
  }

  return (
    <div className="mt-10 text-center">
      <p>
        Anda telah menyelesaikan satu putaran eksperimen. Klik "lanjut" untuk
        menyelesaikan putaran berikutnya
      </p>
      <button
        onClick={nextSession}
        className="block w-full bg-green-400 text-white py-1.5 rounded-md"
      >
        Lanjut
      </button>
    </div>
  );
};
