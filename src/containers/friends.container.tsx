import { Button, Divider, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FriendCardComponent from "../components/card/friend.card.component";
import FriendRequestCardComponent from "../components/card/friend.request.card.component";
import { useWebSocket } from "../providers/websocket.provider";
import { RootState } from "../store";
import { UserStatus } from "../types/user.type";
import {
  WebSocketFriendRequestPayload,
  WebSocketMessage,
} from "../types/websocket.type";

type Page = "ADD" | "ONLINE" | "WAITING" | "ALL";

const FriendsContainer = () => {
  const [page, setPage] = useState<Page>("ALL");

  return (
    <Flex direction={"column"} w={"100%"} gap={2} p={2}>
      <Flex gap={2} mb={4}>
        <Button
          h={8}
          onClick={() => setPage("ALL")}
          bg={page === "ALL" ? "backgroundColor.100" : "backgroundColor.200"}
          textColor={page === "ALL" ? "gray.200" : "gray.500"}
          _hover={{ bg: "backgroundColor.100", textColor: "gray.200" }}
        >
          Tous
        </Button>
        <Button
          h={8}
          onClick={() => setPage("ONLINE")}
          bg={page === "ONLINE" ? "backgroundColor.100" : "backgroundColor.200"}
          textColor={page === "ONLINE" ? "gray.200" : "gray.500"}
          _hover={{ bg: "backgroundColor.100", textColor: "gray.200" }}
        >
          En Ligne
        </Button>
        <Button
          h={8}
          onClick={() => setPage("WAITING")}
          bg={
            page === "WAITING" ? "backgroundColor.100" : "backgroundColor.200"
          }
          textColor={page === "WAITING" ? "gray.200" : "gray.500"}
          _hover={{ bg: "backgroundColor.100", textColor: "gray.200" }}
        >
          En Attente
        </Button>
        <Button h={8} onClick={() => setPage("ADD")} colorScheme="green">
          Ajouter
        </Button>
      </Flex>
      {page === "ADD" && <AddFriendPageComponent />}
      {page === "ONLINE" && <FriendListPageComponent status="ONLINE" />}
      {page === "ALL" && <FriendListPageComponent />}
      {page === "WAITING" && <FriendWaitingListPageComponent />}
    </Flex>
  );
};

const AddFriendPageComponent = () => {
  const [friendInviteNickname, setFriendInviteNickname] = useState("");
  const userState = useSelector((state: RootState) => state.users);
  const { sendMessage } = useWebSocket();

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

    sendMessage(webSocketMessage);
    setFriendInviteNickname("");
  };

  return (
    <>
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
          value={friendInviteNickname}
          onChange={(e) => setFriendInviteNickname(e.target.value)}
        />
        <Button colorScheme="green" onClick={sendFriendsRequest}>
          Ajouter
        </Button>
      </Flex>
    </>
  );
};

const FriendListPageComponent: React.FC<{ status?: UserStatus }> = ({
  status,
}) => {
  const userState = useSelector((state: RootState) => state.users);
  return (
    <>
      <Flex direction={"column"} gap={2} p={2}></Flex>

      <VStack flex={1}>
        <Flex
          direction="column"
          overflowY="auto"
          gap={2}
          w={"100%"}
          textColor={"gray.300"}
          fontWeight={"semibold"}
        >
          {userState.social?.friends
            .filter((u) => {
              if (status) {
                return status === u.userStatus;
              } else {
                return true;
              }
            })
            .map((friends, i) => (
              <>
                <Divider />
                <FriendCardComponent
                  key={i}
                  user={friends}
                  onClick={() => {}}
                />
              </>
            ))}
        </Flex>
      </VStack>
    </>
  );
};

const FriendWaitingListPageComponent = () => {
  const userState = useSelector((state: RootState) => state.users);
  return (
    <>
      <Flex direction={"column"} gap={2} p={2}>
        <VStack flex={1}>
          <Flex direction="column" overflowY="auto" gap={2} w={"100%"}>
            {userState.social?.socialRequests.map((sr) => (
              <FriendRequestCardComponent request={sr} onClick={() => {}} />
            ))}
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default FriendsContainer;
