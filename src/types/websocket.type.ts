export type WebSocketMessageActionType = "PRIVATE_MESSAGE";

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