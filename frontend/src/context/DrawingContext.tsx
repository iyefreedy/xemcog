import { useTimer } from '@/hooks/useTimer'
import Konva from 'konva'
import React, { createContext, useEffect, useRef, useState } from 'react'

type Tool = 'pen' | 'eraser'

type DrawingLine = {
    tool: Tool
    color: string
    stroke: number
    points: number[]
}

export type DrawingState = {
    lines: DrawingLine[]
    image: string
}

export type DrawingContextProps = {
    lines: DrawingLine[]
    tool: Tool
    stroke: number
    color: string
    isDrawing: boolean
    stageRef: React.RefObject<Konva.Stage>
    time: number
    words: string[]
    currentWordIndex: number
    setLines: React.Dispatch<React.SetStateAction<DrawingLine[]>>
    setTool: React.Dispatch<React.SetStateAction<Tool>>
    setStroke: React.Dispatch<React.SetStateAction<number>>
    setColor: React.Dispatch<React.SetStateAction<string>>
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>
    start: () => void
    reset: () => void
    handleSubmit: () => void
}

export const DrawingContext = createContext({} as DrawingContextProps)

export const DrawingProvider = ({
    children,
}: React.PropsWithChildren<{ children: React.ReactNode }>) => {
    const [currentSession, setCurrentSession] = useState(0)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [words, setWords] = useState<string[]>([])

    const [tool, setTool] = useState<Tool>('pen')
    const [drawingState, setDrawingState] = useState<DrawingState[]>([])
    const [lines, setLines] = useState<DrawingLine[]>([])
    const [stroke, setStroke] = useState<number>(1)
    const [color, setColor] = useState<string>('#000000')
    const [isDrawing, setIsDrawing] = useState(false)
    const stageRef = useRef<Konva.Stage>(null)

    const { time, start, reset } = useTimer()

    useEffect(() => {
        if (currentSession < 1) {
            setCurrentSession(1)
        } else {
            setCurrentSession((prev) => prev++)
        }

        setWords([
            'Makan',
            'Minum',
            'Jalan',
            'Main',
            'Bicara',
            'Nonton',
            'Memakan',
            'Meminum',
            'Berjalan',
            'Bermain',
            'Menonton',
        ])
    }, [])

    useEffect(() => {
        if (isDrawing) {
            start()
        }
    }, [isDrawing])

    const handleSubmit = async () => {
        reset()

        setDrawingState((prev) => [
            ...prev,
            { lines, image: stageRef.current?.toDataURL() ?? '' },
        ])

        setCurrentWordIndex((prev) => prev + 1)
        setLines([])
    }

    return (
        <DrawingContext.Provider
            value={{
                lines,
                tool,
                stroke,
                color,
                isDrawing,
                stageRef,
                time,
                words,
                currentWordIndex,
                start,
                reset,
                setTool,
                setStroke,
                setColor,
                setLines,
                setIsDrawing,
                handleSubmit,
            }}
        >
            {children}
        </DrawingContext.Provider>
    )
}
