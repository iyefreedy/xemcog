import { useEffect, useState } from 'react'

export const useTimer = () => {
    const [time, setTime] = useState(0)
    const [date, setDate] = useState(new Date())

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let timerId: any
        if (isRunning) {
            timerId = setInterval(() => setDate(new Date()), 10)
        }

        return () => clearInterval(timerId)
    }, [isRunning])

    useEffect(() => {
        let intervalId: any
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10)
        }
        return () => clearInterval(intervalId)
    }, [isRunning, time])

    const reset = () => {
        setTime(0)
        setIsRunning(false)
    }

    const start = () => {
        setIsRunning(true)
    }

    return { time, start, reset, date }
}
