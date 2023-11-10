import { Conversation } from "./conversation.type";
import { User } from "./user.type";

export type Server = {
    id: string;
    name: string;
    description: string;
    owner: User;
    users: User[];
    conversations: Conversation[];
    created: number;
}

export type ServerInvite = {
    id: string;
    server: Server;
    created: number;
    expire: number;
}