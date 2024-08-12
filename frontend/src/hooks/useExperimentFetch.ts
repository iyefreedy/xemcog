import API from "@/API"
import { Experiment } from "@/types"
import { useEffect, useState } from "react"

export const useExperimentFetch = (experimentId: string) => {
    const [experiment, setExperiment] = useState<Experiment>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchExperiment = async () => {
            try {
                setLoading(true)
                const res = await API.getExperiment(experimentId)
                console.log(res);

                setExperiment(res.data)
            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false)
            }
        }

        fetchExperiment()
    }, [])

    return { experiment, loading }
}