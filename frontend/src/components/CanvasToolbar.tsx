import { DrawingContext } from '@/context/DrawingContext'
import { useContext } from 'react'
import { FaEraser, FaPencil } from 'react-icons/fa6'

export const CanvasToolbar = () => {
    const {
        setTool,
        setStroke,
        setColor,
        handleSubmit,
        words,
        currentWordIndex,
        color,
        tool,
        stroke,
        time,
    } = useContext(DrawingContext)

    const hours = Math.floor(time / 360000)

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000)

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100)

    // Milliseconds calculation
    const milliseconds = time % 100

    return (
        <>
            <p className="mb-4 text-center font-medium text-indigo-600 md:text-xl">
                {words[currentWordIndex]}
            </p>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex space-x-2 md:space-x-4">
                    <div className="h-auto w-7 overflow-hidden rounded-full md:w-9">
                        <input
                            type="color"
                            value={color}
                            className="h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4 transform-cpu cursor-pointer appearance-none border-none bg-transparent"
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <input
                            type="range"
                            step={3}
                            min={1}
                            max={25}
                            value={stroke}
                            className="my-auto w-20 md:w-auto"
                            onChange={(e) =>
                                setStroke(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <button
                        className={`rounded-full p-1.5 ${
                            tool === 'pen' ? 'bg-indigo-300' : 'bg-gray-200'
                        }`}
                        onClick={() => setTool('pen')}
                    >
                        <FaPencil className="h-4 w-4 md:h-6 md:w-6" />
                    </button>
                    <button
                        className={`rounded-full p-1.5 ${
                            tool === 'eraser' ? 'bg-indigo-300' : 'bg-gray-200'
                        }`}
                        onClick={() => setTool('eraser')}
                    >
                        <FaEraser className="h-4 w-4 md:h-6 md:w-6" />
                    </button>
                </div>

                <div className="flex items-center justify-end space-x-2 md:space-x-4">
                    <p className="text-center text-xs md:text-base">
                        {hours}:{minutes.toString().padStart(2, '0')}:
                        {seconds.toString().padStart(2, '0')}:
                        {milliseconds.toString().padStart(2, '0')}
                    </p>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 p-1.5 text-xs text-gray-200 md:p-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}
