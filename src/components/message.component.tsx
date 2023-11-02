import { Avatar, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Message } from "../types/message.type";
import CardComponent from "./card.component";

const MessageComponent: FunctionComponent<{ message: Message }> = ({
  message,
}) => {
  return (
    <CardComponent>
      <Flex gap={2}>
        <Avatar name={message.sender.nickname} />
        <Flex direction={"column"}>
          <Text>{message.sender.nickname}</Text>
          <Text wordBreak={"break-word"}>{message.content}</Text>
        </Flex>
      </Flex>
    </CardComponent>
  );
};

export default MessageComponent;
