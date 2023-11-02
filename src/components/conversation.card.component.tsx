import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Conversation } from "../types/conversation.type";
import { User } from "../types/user.type";
import CardComponent from "./card.component";

const ConversationCardComponent: React.FC<{
  conversation: Conversation;
  actualUser: User;
  onClick: (conversation: Conversation) => void;
}> = ({ conversation, actualUser, onClick }) => {
  return (
    <CardComponent onClick={() => onClick(conversation)}>
      <Flex gap={4}>
        {conversation.users.length > 2 ? (
          <Flex>
            <Avatar name={actualUser.nickname} />
          </Flex>
        ) : (
          conversation.users
            .filter((u) => u.id !== actualUser.id)
            .map((u, i) => (
              <Flex alignItems={"center"} gap={2}>
                <Avatar name={u.nickname} />
                <Text>{u.nickname}</Text>
              </Flex>
            ))
        )}
      </Flex>
    </CardComponent>
  );
};

export default ConversationCardComponent;
