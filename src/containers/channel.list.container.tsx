import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRoute } from "../providers/route.provider";
import serverService from "../services/server.service";
import { RootState } from "../store";
import { Conversation } from "../types/conversation.type";
import { Server } from "../types/server.type";

const ChannelListContainer = () => {
  const { navigateTo } = useRoute();
  const { serverId } = useParams();
  const [server, setServer] = useState<Server>();
  const serverState = useSelector((state: RootState) => state.server);

  useEffect(() => {
    if (serverId) {
      const server = serverState.servers.find((s) => s.id === serverId);
      if (server) {
        setServer(server);
      } else {
        navigateTo("app");
      }
    } else {
      navigateTo("app");
    }
  }, [navigateTo, serverId, serverState.servers]);

  const createServerInvite = () => {
    serverId && serverService.createServerInvite(serverId).then((c) => {});
  };

  return (
    <Flex
      direction="column"
      w="250px"
      bg="backgroundColor.400"
      flex={1}
      overflowY="auto"
      textColor={"gray.200"}
      gap={1}
    >
      <Flex
        shadow={"lg"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        mb={4}
      >
        <Text p={4} fontSize={"2xl"}>
          {server?.name}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            _hover={{ color: "gray.200" }}
            size={"lg"}
            icon={
              <HamburgerIcon
                color={"gray.500"}
                _hover={{ color: "gray.200" }}
              />
            }
            variant={"ghost"}
          />
          <MenuList bg={"backgroundColor.800"}>
            <MenuItem
              icon={<AddIcon />}
              bg={"backgroundColor.800"}
              onClick={() => createServerInvite()}
            >
              Create invite
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {server?.conversations.map((c, index) => {
        return <ChannelCardComponent key={index} conversation={c} />;
      })}
    </Flex>
  );
};

const ChannelCardComponent: React.FC<{ conversation: Conversation }> = ({
  conversation,
}) => {
  return <Box pl={4}>{"# " + conversation.name}</Box>;
};

export default ChannelListContainer;
