import { axiosInstance } from "@/utils"

export const createUser = ({ fullname, email, password }: { fullname: string, email: string, password: string }) => {

    axiosInstance.post('users/', { fullname, email, password }, {
        method: 'POST',

    })
}