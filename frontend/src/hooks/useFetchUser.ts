import userService from '@/services/userService'
import { CreateUserInfo, User } from '@/types'
import { useEffect, useState } from 'react'

export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getUsers()

                setUsers(users)
            } catch (error) {
                setUsers([])
            }
        }

        fetchUsers()
    }, [])

    const attemptCreateUser = async (userInfo: CreateUserInfo) => {
        return await userService.createUser(userInfo)
    }

    return { users, attemptCreateUser }
}
