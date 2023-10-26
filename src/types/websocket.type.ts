export type WebSocketMessageActionType = "PRIVATE_MESSAGE" | "FRIENDS_REQUEST" | "FRIENDS_REQUEST_RESPONSE";

export type WebSocketMessage = {
    actionType: WebSocketMessageActionType,
    payload: Object,
    sender: string,
    timestamp: string
}

export type WebSocketPrivateMessagePayload = {
    senderId: string,
    conversationId: string,
    messageId?: string,
    message: string
}

export type WebSocketFriendRequestPayload = {
    inviteSenderId: string,
    receiverNickname: string
}

export type FriendResponseType = "ACCEPTED" | "REJECTED";

export type WebSocketFriendRequestResponsePayload = {
    socialRequestId: string,
    response: FriendResponseType
}