import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, Flex, IconButton, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "../providers/websocket.provider";
import {
  AppDispatch,
  addConversation,
} from "../reducer/slice/conversationSlice";
import conversationService from "../services/conversation.service";
import { RootState } from "../store";
import { User } from "../types/user.type";
import CardComponent from "./card.component";
import { PhoneIcon } from "./icon.components";

const getStatus = (status: string) => {
  if (status === "online") {
    return <AvatarBadge borderColor="green.100" bg="green.300" boxSize="1em" />;
  } else if (status === "absent") {
    return (
      <AvatarBadge borderColor="orange.100" bg="orange.300" boxSize="1em" />
    );
  } else if (status === "red") {
    return <AvatarBadge borderColor="red.100" bg="red.300" boxSize="1em" />;
  } else {
    return <AvatarBadge borderColor="gray.100" bg="gray.300" boxSize="1em" />;
  }
};

const FriendCardComponent: React.FC<{
  user: User;
  onClick: (user: User) => void;
}> = ({ user, onClick }) => {
  const phrases: string[] = ["online", "red", "absent", "disconnect"];
  const { startCall } = useWebSocket();
  const userState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  const _startCall = () => {
    if (userState.actualUser) {
      conversationService
        .createConversation([userState.actualUser, user])
        .then((c) => {
          dispatch(addConversation(c));
          startCall(c);
        });
    }
  };

  const createConversation = () => {
    if (userState.actualUser) {
      conversationService
        .createConversation([userState.actualUser, user])
        .then((c) => {
          dispatch(addConversation(c));
        });
    }
  };

  return (
    <CardComponent onClick={() => onClick(user)}>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex gap={4}>
          <Avatar>{getStatus(handleRandomize())}</Avatar>
          <Flex direction={"column"}>
            <Text>{user.nickname}</Text>
            <Text fontSize={"sm"}>En ligne</Text>
          </Flex>
        </Flex>
        <Flex gap={2}>
          <IconButton
            colorScheme={"blue"}
            icon={<ChatIcon />}
            aria-label={"Send message"}
            onClick={createConversation}
          />
          <IconButton
            colorScheme={"green"}
            icon={<PhoneIcon />}
            aria-label={"Call"}
            onClick={_startCall}
          />
          <IconButton
            colorScheme={"red"}
            icon={<DeleteIcon />}
            aria-label={"Delete user"}
          />
        </Flex>
      </Flex>
    </CardComponent>
  );
};

export default FriendCardComponent;
