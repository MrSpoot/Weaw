import { StarIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ConversationCardComponent from "../components/card/conversation.card.component";
import { useRoute } from "../providers/route.provider";
import { RootState } from "../store";

const ConversationListContainer = () => {
  const { navigateTo } = useRoute();
  const userState = useSelector((state: RootState) => state.users);
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  return (
    <Flex
      direction="column"
      w="250px"
      bg="backgroundColor.400"
      overflowY="auto"
      flex={1}
      p={2}
      gap={1}
    >
      <Button
        justifyContent={"start"}
        gap={2}
        leftIcon={
          <StarIcon color={"gray.500"} _groupHover={{ color: "gray.200" }} />
        }
        onClick={() => navigateTo("app")}
        bg="backgroundColor.400"
        textColor={"gray.500"}
        _hover={{ bg: "backgroundColor.100", textColor: "gray.200" }}
      >
        Amis
      </Button>
      {conversationState
        .filter((conv) => conv.conversation.serverId === null)
        .map((c, index) => {
          return (
            userState.actualUser && (
              <ConversationCardComponent
                key={index}
                conversation={c.conversation}
                actualUser={userState.actualUser}
                onClick={() => navigateTo(`app/channel/${c.conversation.id}`)}
              />
            )
          );
        })}
    </Flex>
  );
};

export default ConversationListContainer;
