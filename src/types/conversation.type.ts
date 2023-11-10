import { User } from "./user.type"

export type Conversation = {
    id: string,
    name?: string,
    serverId: string | undefined,
    users: User[],
    created: number
}