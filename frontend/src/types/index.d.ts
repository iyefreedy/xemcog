import { LayoutContextProps, LayoutMenuMode, LayoutState } from '@/types/layout'

export interface User {
    id: number
    fullname: string
    email: string
    is_admin: boolean
}

export interface Session {
    id: number
    session_number: number
    user_id: number
}

export type CreateUserInfo = Omit<User, 'is_admin' | 'id'> & {
    password: string
}

export type CredentialInfo = Pick<User, 'email'> & { password: string }

export { LayoutContextProps, LayoutMenuMode, LayoutState }
