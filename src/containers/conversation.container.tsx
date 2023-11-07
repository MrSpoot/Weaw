import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EmojiIcon } from "../components/icon.components";
import MessageListComponent from "../components/message.list.component";
import { useRoute } from "../providers/route.provider";
import { useWebSocket } from "../providers/websocket.provider";
import conversationService from "../services/conversation.service";
import { RootState } from "../store";
import { Conversation } from "../types/conversation.type";
import {
  WebSocketMessage,
  WebSocketPrivateMessagePayload,
} from "../types/websocket.type";

const ConversationContainer: React.FC = () => {
  const emojiPickerRef = useRef(null as HTMLDivElement | null);
  const { navigateTo } = useRoute();
  const [actualWritedMessage, setActualWritedMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userState = useSelector((state: RootState) => state.users);
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  const { sendMessage } = useWebSocket();
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation>();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      _sendMessage();
    }
  };

  useEffect(() => {
    if (conversationId) {
      const c = conversationState.find(
        (c) => c.conversation.id === conversationId
      );
      if (c) {
        setConversation(c.conversation);
      } else {
        conversationService
          .getUserConversation(conversationId)
          .then((c) => {
            if (c) {
              setConversation(c);
            } else {
              navigateTo("app");
            }
          })
          .catch(() => navigateTo("app"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false); // Cacher le picker si le clic est en dehors
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const _sendMessage = () => {
    if (actualWritedMessage.length > 0) {
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
    }
  };

  return (
    <>
      {conversation ? (
        <VStack flex={1}>
          <Flex bg={"blackAlpha.100"} w={"full"} p={2} shadow={"md"}>
            {conversation.users
              .filter((u) => u.id !== userState.actualUser?.id ?? "")
              .map((u, i) => {
                return (
                  <Flex key={i} alignItems={"center"} gap={2}>
                    <Avatar size={"sm"} name={u.nickname} />
                    <Text>{u.nickname}</Text>
                  </Flex>
                );
              })}
          </Flex>
          <Flex direction={"row"} h="100vh" overflowY="auto" w={"full"} px={4}>
            <Flex
              direction="column-reverse"
              overflowY="auto"
              gap={2}
              w={"100%"}
            >
              <MessageListComponent conversationId={conversation?.id ?? ""} />
            </Flex>
          </Flex>
          <HStack bg="gray.850" p={4} w={"100%"} gap={2}>
            <Input
              placeholder="Type your message here..."
              variant="filled"
              size="lg"
              value={actualWritedMessage}
              onChange={(e) => setActualWritedMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {showEmojiPicker && (
              <Box
                position={"absolute"}
                bottom={"75px"}
                right={"50px"}
                zIndex={10}
                ref={emojiPickerRef}
              >
                <Picker
                  onEmojiSelect={(e: any) => {
                    setActualWritedMessage(
                      actualWritedMessage.concat(e.native)
                    );
                    setShowEmojiPicker(!showEmojiPicker);
                  }}
                  perLine={6}
                  emojiSize={24}
                />
              </Box>
            )}

            <Flex>
              <EmojiIcon
                color="gray.400"
                boxSize={6}
                mx={2}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ></EmojiIcon>
            </Flex>
            <Button colorScheme="blue" onClick={_sendMessage}>
              Send
            </Button>
          </HStack>
        </VStack>
      ) : (
        <Center h={"full"}>
          <Spinner size={"xl"} />
        </Center>
      )}
    </>
  );
};

export default ConversationContainer;
