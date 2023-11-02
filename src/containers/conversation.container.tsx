import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import MessageListComponent from "../components/message.list.component";
import { useWebSocket } from "../providers/websocket.provider";
import { RootState } from "../store";
import { Conversation } from "../types/conversation.type";
import {
  WebSocketMessage,
  WebSocketPrivateMessagePayload,
} from "../types/websocket.type";

const ConversationContainer: React.FC<{ conversation: Conversation }> = ({
  conversation,
}) => {
  const [actualWritedMessage, setActualWritedMessage] = useState("");
  const userState = useSelector((state: RootState) => state.users);
  const { sendMessage } = useWebSocket();

  const _sendMessage = () => {
    const payload: WebSocketPrivateMessagePayload = {
      senderId: userState.actualUser?.id ?? "",
      conversationId: conversation?.id ?? "",
      message: actualWritedMessage,
    };

    const webSocketMessage: WebSocketMessage = {
      actionType: "PRIVATE_MESSAGE",
      payload: payload,
      sender: userState.actualUser?.id ?? "",
      timestamp: new Date().toISOString(),
    };
    sendMessage(webSocketMessage);
    setActualWritedMessage("");
  };

  return (
    <>
      <Flex direction={"row"} h="100vh" overflowY="auto" w={"full"} px={4}>
        <Flex direction="column-reverse" overflowY="auto" gap={2} w={"100%"}>
          <MessageListComponent conversationId={conversation?.id ?? ""} />
        </Flex>
      </Flex>
      <HStack bg="gray.850" p={4} w={"100%"}>
        <Input
          placeholder="Type your message here..."
          variant="filled"
          size="lg"
          value={actualWritedMessage}
          onChange={(e) => setActualWritedMessage(e.target.value)}
        />
        <Button colorScheme="blue" onClick={_sendMessage}>
          Send
        </Button>
      </HStack>
    </>
  );
};

export default ConversationContainer;
