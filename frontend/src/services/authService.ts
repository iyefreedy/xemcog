import { User, CredentialInfo } from '@/types'
import { axiosInstance } from '@/utils'

export default {
    login: (data: CredentialInfo) => {
        return axiosInstance.post('login', data)
    },
    authenticate: async () => {
        const response = await axiosInstance.get<User>('authenticate')
        return response.data
    },
}
