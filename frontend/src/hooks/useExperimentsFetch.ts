import API from "@/API"
import { Experiment } from "@/types"
import { useEffect, useState } from "react"

export const useExperimentsFetch = () => {
    const [experiments, setExperiments] = useState<Experiment[]>([])

    useEffect(() => {
        const fetchExperiments = async () => {
            const res = await API.getExperiments()
            setExperiments(res.data)
        }
        fetchExperiments()
    }, [])

    return { experiments }
}