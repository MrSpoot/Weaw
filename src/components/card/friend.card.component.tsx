import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, Flex, IconButton, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useCall } from "../../providers/call.provider";
import { useRoute } from "../../providers/route.provider";
import { setCall } from "../../reducer/slice/callSlice.ts";
import {
  AppDispatch,
  addConversation,
} from "../../reducer/slice/conversationSlice";
import conversationService from "../../services/conversation.service";
import { RootState } from "../../store";
import { User, UserStatus } from "../../types/user.type";
import { PhoneIcon } from "../icon.components";
import CardComponent from "./card.component";

const getStatus = (status: UserStatus) => {
  switch (status) {
    case "ONLINE":
      return (
        <AvatarBadge borderColor="green.100" bg="green.300" boxSize="1em" />
      );
    case "OFFLINE":
    case "INVISIBLE":
    default:
      return <AvatarBadge borderColor="gray.100" bg="gray.300" boxSize="1em" />;
  }

  // if (status === "online") {

  // } else if (status === "absent") {
  //   return (
  //     <AvatarBadge borderColor="orange.100" bg="orange.300" boxSize="1em" />
  //   );
  // } else if (status === "red") {
  //   return <AvatarBadge borderColor="red.100" bg="red.300" boxSize="1em" />;
  // } else {

  // }
};

const FriendCardComponent: React.FC<{
  user: User;
  onClick: (user: User) => void;
}> = ({ user, onClick }) => {
  const userState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const { navigateTo } = useRoute();

  const { startCall } = useCall();

  const _startCall = () => {
    if (userState.actualUser) {
      conversationService
        .createConversation([userState.actualUser, user])
        .then((c) => {
          dispatch(addConversation(c));
          userState.actualUser &&
            startCall(userState.actualUser, c)?.then((info) => {
              dispatch(
                setCall({
                  conversation: c,
                  isCalling: true,
                  direction: "EMITTER",
                  webRTCInfo: info,
                })
              );
            });
        });
    }
  };

  const createConversation = () => {
    if (userState.actualUser) {
      conversationService
        .createConversation([userState.actualUser, user])
        .then((c) => {
          dispatch(addConversation(c));
          navigateTo(`app/channel/${c.id}`);
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
          <Avatar>{getStatus(user.userStatus)}</Avatar>
          <Flex direction={"column"}>
            <Text>{user.nickname}</Text>
            <Text fontSize={"sm"}>{user.userStatus}</Text>
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
