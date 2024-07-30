import API from '@/API'
import { useTimer } from '@/hooks/useTimer'
import sessionService from '@/services/sessionService'
import stimuliService from '@/services/stimuliService'
import { Session } from '@/types'
import { dataURItoBlob } from '@/utils'
import Konva from 'konva'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    const [session, setSession] = useState<Session | null>(null)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [words, setWords] = useState<string[]>([])

    const [tool, setTool] = useState<Tool>('pen')
    const [lines, setLines] = useState<DrawingLine[]>([])
    const [stroke, setStroke] = useState<number>(1)
    const [color, setColor] = useState<string>('#000000')
    const [isDrawing, setIsDrawing] = useState(false)

    const stageRef = useRef<Konva.Stage>(null)

    const { time, start, reset: resetTimer, date } = useTimer()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWords = async () => {
            const words = await stimuliService.getStimulis()
            setWords(words)
        }

        const createSession = async () => {
            const newSession = await sessionService.createNewSession()
            setSession(newSession)
            localStorage.setItem('currentSession', JSON.stringify(newSession))
        }

        const currentSession = localStorage.getItem('currentSession')
        if (!currentSession) {
            createSession()
        } else {
            setSession(JSON.parse(currentSession) as Session)
        }

        fetchWords()
    }, [])

    useEffect(() => {
        if (isDrawing) {
            start()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawing])

    const handleSubmit = async () => {
        saveResponse()
        if (currentWordIndex == words.length - 1) {
            navigate('/thank-you')
        }
        resetTimer()

        setCurrentWordIndex((prev) => prev + 1)
        resetToolbar()
    }

    const resetToolbar = () => {
        setLines([])
        setStroke(1)
        setColor('#000000')
    }

    const saveResponse = async () => {
        const blob = dataURItoBlob(stageRef.current?.toDataURL() ?? '')
        console.log(time, date)

        const formData = new FormData()
        formData.append(
            'interpretation_image_path',
            blob,
            Math.random() + '.jpg'
        )
        formData.append('response_time', time.toString())
        formData.append('session_id', `${session?.id.toString()}`)
        formData.append('word', words[currentWordIndex])

        await API.saveResponse(formData)
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
                reset: resetTimer,
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
