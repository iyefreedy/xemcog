import { CreateUserInfo, User } from '@/types'
import { axiosInstance } from '@/utils'

export default {
    getUsers: async () => {
        const response = await axiosInstance.get<User[]>('users/')
        return response.data
    },
    createUser: (data: CreateUserInfo) => {
        return axiosInstance.post('users/', { ...data })
    },
}
