import { User, CredentialInfo, CreateUserInfo, Session } from '@/types'
import { axiosInstance } from '@/utils'

export default {
    login: (data: CredentialInfo) => {
        return axiosInstance.post('login', data)
    },
    authenticate: async () => {
        const response = await axiosInstance.get<User>('authenticate')
        return response.data
    },
    getUsers: async () => {
        const response = await axiosInstance.get<User[]>('users/')
        return response.data
    },
    createUser: (data: CreateUserInfo) => {
        return axiosInstance.post('users/', { ...data })
    },
    getStimulis: async () => {
        const response = await axiosInstance.get('stimulis/')
        return response.data
    },
    createNewSession: async () => {
        const response = await axiosInstance.post<Session>('sessions/')

        return response.data
    },
    endSession: async () => {},
    saveResponse: async (data: FormData) => {
        const response = await axiosInstance.post('responses/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    },
}
