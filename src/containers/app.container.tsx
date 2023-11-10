import { AddIcon, StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  ScaleFade,
  VStack,
} from "@chakra-ui/react";
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

  const [hoveredServerBubble, setHoveredServerBubble] = useState(
    Array(serverState.servers.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    const updatedHoveredItems = [...hoveredServerBubble];
    updatedHoveredItems[index] = true;
    setHoveredServerBubble(updatedHoveredItems);
  };

  const handleMouseLeave = (index: number) => {
    const updatedHoveredItems = [...hoveredServerBubble];
    updatedHoveredItems[index] = false;
    setHoveredServerBubble(updatedHoveredItems);
  };

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
          <Box minH="100vh" bg="backgroundColor.200">
            <Flex h="100vh" justify={"flex-start"}>
              <Flex
                direction="column"
                bg="backgroundColor.800"
                w="80px"
                justifyContent="space-between"
              >
                <VStack gap="2" py={2} pr={2}>
                  <Flex alignItems={"center"} position={"relative"} gap={2}>
                    <Box h={"2"} aspectRatio={"1/1"} roundedRight={"md"}></Box>
                    <IconButton
                      h={"50px"}
                      w={"50px"}
                      rounded={"full"}
                      bg={"backgroundColor.200"}
                      _hover={{ bg: "backgroundColor.100" }}
                      icon={<StarIcon color={"gray.200"} />}
                      onClick={() => navigateTo("app")}
                      aria-label={""}
                    ></IconButton>
                  </Flex>
                  {serverState.servers.map((s, index) => {
                    return (
                      <>
                        <Flex
                          alignItems={"center"}
                          position={"relative"}
                          gap={2}
                        >
                          <ScaleFade
                            initialScale={0.1}
                            in={hoveredServerBubble[index]}
                          >
                            <Box
                              h={"4"}
                              w={"2"}
                              bg={"gray.300"}
                              roundedRight={"md"}
                            ></Box>
                          </ScaleFade>
                          <ServerBubbleComponent
                            server={s}
                            onClick={() =>
                              navigateTo(
                                `app/server/${s.id}/channel/${s.conversations[0].id}`
                              )
                            }
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                          />
                        </Flex>
                      </>
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
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ server, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <>
      <Avatar
        name={server.name}
        onClick={onClick}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
      />
    </>
  );
};

export default AppContainer;
