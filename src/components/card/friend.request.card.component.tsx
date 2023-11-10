import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, Flex, IconButton, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../providers/websocket.provider";
import { RootState } from "../../store";
import { SocialRequest } from "../../types/social.type";
import { User } from "../../types/user.type";
import {
  ResponseType,
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
} from "../../types/websocket.type";
import CardComponent from "./card.component";

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

const FriendRequestCardComponent: React.FC<{
  request: SocialRequest;
  onClick: (user: User) => void;
}> = ({ request, onClick }) => {
  const phrases: string[] = ["online", "red", "absent", "disconnect"];

  const userState = useSelector((state: RootState) => state.users);

  const { sendMessage } = useWebSocket();

  const sendFriendsRequestResponse = (response: ResponseType) => {
    const payload: WebSocketFriendRequestResponsePayload = {
      socialRequestId: request.id,
      response: response,
    };

    const webSocketMessage: WebSocketMessage = {
      actionType: "FRIENDS_REQUEST_RESPONSE",
      payload: payload,
      sender: userState.actualUser?.id ?? "",
      timestamp: new Date().toISOString(),
    };

    sendMessage(webSocketMessage);
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  return (
    <CardComponent>
      {request.requestDirection === "EMITTER" ? (
        <>
          <Flex justifyContent={"space-between"}>
            <Flex gap={4}>
              <Avatar>{getStatus(handleRandomize())}</Avatar>
              <Flex direction={"column"}>
                <Text>{request.receiver.nickname}</Text>
                <Text fontSize={"sm"}>En ligne</Text>
              </Flex>
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <TimeIcon />
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex justifyContent={"space-between"}>
            <Flex gap={4}>
              <Avatar>{getStatus(handleRandomize())}</Avatar>
              <Flex direction={"column"}>
                <Text>{request.sender.nickname}</Text>
                <Text fontSize={"sm"}>En ligne</Text>
              </Flex>
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <IconButton
                size={"sm"}
                aria-label={"accept"}
                icon={<CheckIcon />}
                colorScheme="green"
                onClick={() => sendFriendsRequestResponse("ACCEPTED")}
              ></IconButton>
              <IconButton
                size={"sm"}
                aria-label={"decline"}
                icon={<CloseIcon />}
                colorScheme="red"
                onClick={() => sendFriendsRequestResponse("REJECTED")}
              ></IconButton>
            </Flex>
          </Flex>
        </>
      )}
    </CardComponent>
  );
};

export default FriendRequestCardComponent;
