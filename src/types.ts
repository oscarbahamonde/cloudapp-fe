import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export type User = {
    uid: string
    displayName: string
    email: string
    photoURL?: string
}
