import { axiosInstance } from '@/utils'

export default {
    getStimulis: async () => {
        const response = await axiosInstance.get('stimulis/')
        return response.data
    },
}
