import API from '@/API'
import { useEffect, useState } from 'react'

export const useFetchResponse = () => {
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {})
    return { responses }
}
