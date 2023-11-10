import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Divider, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CallModalComponent from "../components/modal/call.modal.component";
import ServerCreationModalComponent from "../components/modal/server.creation.modal.component";
import UserActionComponent from "../components/user.action.component";
import { useRoute } from "../providers/route.provider";
import { RootState } from "../store";
import { Server } from "../types/server.type";
import WebsocketContainer from "./websocket.container";

const AppContainer: React.FC<{
  leftChildren: JSX.Element;
  children: JSX.Element;
}> = ({ leftChildren, children }) => {
  const userState = useSelector((state: RootState) => state.users);
  const serverState = useSelector((state: RootState) => state.server);
  const { navigateTo } = useRoute();

  const [serverCreationModalIsShow, setServerCreationModalIsShow] =
    useState(false);

  return (
    <>
      <WebsocketContainer>
        <>
          <ServerCreationModalComponent
            isShow={serverCreationModalIsShow}
            onClose={() => {
              setServerCreationModalIsShow(false);
            }}
          />
          <CallModalComponent />
          <Box minH="100vh" bg="gray.200">
            <Flex h="100vh" justify={"flex-start"}>
              <Flex
                direction="column"
                bg="gray.300"
                w="80px"
                justifyContent="space-between"
              >
                <VStack gap="2" py={2}>
                  <Box
                    h={"50px"}
                    w={"50px"}
                    rounded={"full"}
                    bg={"red"}
                    onClick={() => navigateTo("app")}
                  ></Box>
                  <Divider></Divider>
                  {serverState.servers.map((s) => {
                    return (
                      <ServerBubbleComponent
                        server={s}
                        onClick={() =>
                          navigateTo(
                            `app/server/${s.id}/channel/${s.conversations[0].id}`
                          )
                        }
                      />
                    );
                  })}
                </VStack>
                <VStack mb={4} justify={"flex-end"}>
                  <Button
                    w="50px"
                    h="50px"
                    colorScheme="blue"
                    rounded={"full"}
                    onClick={() => setServerCreationModalIsShow(true)}
                  >
                    <AddIcon />
                  </Button>
                </VStack>
              </Flex>

              <Flex direction="column" justifyContent={"space-between"}>
                {leftChildren}
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

const ServerBubbleComponent: React.FC<{
  server: Server;
  onClick: () => void;
}> = ({ server, onClick }) => {
  return (
    <>
      <Avatar name={server.name} onClick={onClick} />
    </>
  );
};

export default AppContainer;
