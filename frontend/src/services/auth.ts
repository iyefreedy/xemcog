import { axiosInstance } from "@/utils"

export const login = (data: any) => {
    return axiosInstance.post('login', data)
}

export const authenticate = () => {
    return axiosInstance.get('authenticate')
}