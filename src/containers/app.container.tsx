import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConversationCardComponent from "../components/conversation.card.component";
import UserActionComponent from "../components/user.action.component";
import { RootState } from "../store";
import { Conversation } from "../types/conversation.type";
import ConversationContainer from "./conversation.container";
import FriendsContainer from "./friends.container";

type PageType = "CONVERSATION" | "FRIENDS";

const AppContainer: React.FC = () => {
  const userState = useSelector((state: RootState) => state.users);
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );

  const [pageType, setPageType] = useState<PageType>("FRIENDS");

  const [conversation, setConversation] = useState<Conversation>();

  const changeConversation = (conversation: Conversation) => {
    setConversation(conversation);
    setPageType("CONVERSATION");
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
            {conversationState.map((c, index) => {
              return (
                userState.actualUser && (
                  <ConversationCardComponent
                    key={index}
                    conversation={c.conversation}
                    actualUser={userState.actualUser}
                    onClick={changeConversation}
                  />
                )
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
        {pageType === "CONVERSATION" && conversation && (
          <ConversationContainer conversation={conversation} />
        )}
        {pageType === "FRIENDS" && <FriendsContainer />}
      </Flex>
    </Box>
  );
};

export default AppContainer;
