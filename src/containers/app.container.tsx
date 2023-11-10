import { AddIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CallModalComponent from "../components/call.modal.component";
import ConversationCardComponent from "../components/conversation.card.component";
import UserActionComponent from "../components/user.action.component";
import { useRoute } from "../providers/route.provider";
import { RootState } from "../store";
import WebsocketContainer from "./websocket.container";

const AppContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const userState = useSelector((state: RootState) => state.users);
  const { navigateTo } = useRoute();
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );

  return (
    <>
      <WebsocketContainer>
        <>
          <CallModalComponent />
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
                  <Button
                    justifyContent={"start"}
                    gap={2}
                    textColor={"gray.500"}
                    leftIcon={<StarIcon color={"gray.500"} />}
                    onClick={() => navigateTo("app")}
                  >
                    Amis
                  </Button>
                  {conversationState.map((c, index) => {
                    return (
                      userState.actualUser && (
                        <ConversationCardComponent
                          key={index}
                          conversation={c.conversation}
                          actualUser={userState.actualUser}
                          onClick={() =>
                            navigateTo(`app/channel/${c.conversation.id}`)
                          }
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
              {children}
            </Flex>
          </Box>
        </>
      </WebsocketContainer>
    </>
  );
};

export default AppContainer;
