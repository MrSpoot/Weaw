import { User } from "./user.type";

export type Social = {
    id: string,
    userId: string,
    friends: User[],
    socialRequests: SocialRequest[]
};

export type SocialRequest = {
    id: string,
    requestDirection: string,
    sender: User,
    receiver: User,
    timestamp: number
};
  