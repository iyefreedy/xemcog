import { Session } from '@/types'
import { axiosInstance } from '@/utils'

export default {
    createNewSession: async () => {
        const response = await axiosInstance.post<Session>('sessions/')

        return response.data
    },
    endSession: async () => {},
}
