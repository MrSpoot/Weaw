import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  Divider,
  useStatStyles,
  HStack,
  Alert,
  AlertIcon,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserCardComponent from "../components/user.card.component";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Conversation } from "../types/conversation.type";
import { User } from "../types/user.type";
import { useWebSocket } from "../providers/websocket.provider";
import {
  WebSocketFriendRequestPayload,
  WebSocketMessage,
  WebSocketPrivateMessagePayload,
} from "../types/websocket.type";
import conversationService from "../services/conversation.service";
import UserActionComponent from "../components/user.action.component";
import FriendCardComponent from "../components/friend.card.component";

type pageType = "FRIENDS_LIST" | "CONVERSATION";

interface ChannelProps {
  name: string;
}

const Channel: React.FC<ChannelProps> = ({ name }) => (
  <Box py={2} px={4} _hover={{ bg: "gray.600", cursor: "pointer" }}>
    #{name}
  </Box>
);

interface MessageProps {
  author: string;
  content: string;
}

const Message: React.FC<MessageProps> = ({ author, content }) => (
  <Flex direction="row" p={3} rounded={16} w="100%">
    <Box w="40px" h="40px" borderRadius="full" bg="blue.500" mr={4} />
    <VStack align="start" spacing={1}>
      <Text fontWeight="bold">{author}</Text>
      <Text>{content}</Text>
    </VStack>
  </Flex>
);

const AppContainer: React.FC = () => {
  const userState = useSelector((state: RootState) => state.users);
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );

  const { sendMessage } = useWebSocket();

  const [pageType, setPageType] = useState<pageType>("FRIENDS_LIST");

  const [conversation, setConversation] = useState<Conversation>();
  const [actualWritedMessage, setActualWritedMessage] = useState("");
  const [friendInviteNickname, setFriendInviteNickname] = useState("");

  const changeConversation = (user: User) => {
    let c = conversationState.find(
      (c) =>
        c.conversation.users.includes(user) &&
        userState.actualUser &&
        c.conversation.users.includes(userState.actualUser) &&
        c.conversation.serverId === undefined
    )?.conversation;

    if (c) {
      setConversation(c);
    } else {
      userState.actualUser &&
        conversationService
          .createConversation([user, userState.actualUser])
          .then((c) => setConversation(c));
    }
  };

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
  };

  const sendFriendsRequest = () => {
    const payload: WebSocketFriendRequestPayload = {
      inviteSenderId: userState.actualUser?.id ?? "",
      receiverNickname: friendInviteNickname,
    };

    const webSocketMessage: WebSocketMessage = {
      actionType: "FRIENDS_REQUEST",
      payload: payload,
      sender: userState.actualUser?.id ?? "",
      timestamp: new Date().toISOString(),
    };
  };

  return (
    <Box minH="100vh" bg="gray.200">
      <Flex h="100vh" justify={"flex-start"}>
        <Flex
          direction="column"
          bg="gray.300"
          w="80px"
          justifyContent="space-between"
        >
          <VStack gap="2" p={4}>
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
          </VStack>
          <VStack mb={4} justify={"flex-end"}>
            <Button w="50px" h="50px" colorScheme="blue" rounded={"full"}>
              <AddIcon />
            </Button>
          </VStack>
        </Flex>

        <Flex direction="column" justifyContent={"space-between"}>
          <Flex
            direction="column"
            w="250px"
            bg="gray.850"
            overflowY="auto"
            p={2}
            gap={1}
          >
            {userState.actualUser && (
              <UserCardComponent
                user={userState.actualUser}
                onClick={() => {}}
              />
            )}
            {userState.social?.friends.map((u, index) => {
              return (
                <UserCardComponent
                  key={index}
                  user={u}
                  onClick={changeConversation}
                />
              );
            })}
          </Flex>
          {userState.actualUser && (
            <UserActionComponent
              user={userState.actualUser}
              onClick={() => {}}
            />
          )}
        </Flex>

        {pageType === "FRIENDS_LIST" && (
          <>
            <Flex direction={"column"} gap={2} p={2}>
              <Flex direction={"column"}>
                <Text fontWeight={"bold"}>AJOUTER UN AMI</Text>
                <Text fontSize={"sm"}>
                  Tu peux ajouter des amis grâce à leurs pseudo Weaw
                </Text>
              </Flex>
              <Flex gap={2}>
                <Input
                  placeholder="Pseudo"
                  variant="filled"
                  size="md"
                  onChange={(e) => setFriendInviteNickname(e.target.value)}
                />
                <Button colorScheme="green" onClick={sendFriendsRequest}>
                  Ajouter
                </Button>
              </Flex>
            </Flex>

            <VStack flex={1}>
              <Flex direction="column" overflowY="auto" gap={2} w={"100%"}>
                {userState.social?.friends.map((friends) => (
                  <FriendCardComponent user={friends} onClick={() => {}} />
                ))}
              </Flex>
            </VStack>
          </>
        )}

        {pageType === "CONVERSATION" && (
          <VStack flex={1}>
            <Flex
              direction={"row"}
              h="100vh"
              overflowY="auto"
              w={"full"}
              px={4}
            >
              <Flex
                direction="column-reverse"
                overflowY="auto"
                gap={2}
                w={"100%"}
              >
                <Message author="John" content="Hello, how are you?" />
                <Message author="Doe" content="I'm fine, thank you!" />
              </Flex>
            </Flex>

            {/* Message Input */}
            <HStack bg="gray.850" p={4} w={"100%"}>
              <Input
                placeholder="Type your message here..."
                variant="filled"
                size="lg"
                onChange={(e) => setActualWritedMessage(e.target.value)}
              />
              <Button colorScheme="blue" onClick={_sendMessage}>
                Send
              </Button>
            </HStack>
          </VStack>
        )}
      </Flex>
    </Box>
  );
};

export default AppContainer;
