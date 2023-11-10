import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Message } from "../types/message.type";
import CardComponent from "./card/card.component";

const urlRegex = /https?:\/\/\S+/g;

const getUrlInText = (text: string) => {
  const matches = text.match(urlRegex);
  console.log(matches);
  return matches;
};

const MessageComponent: FunctionComponent<{ message: Message }> = ({
  message,
}) => {
  const [text] = useState(message.content.split(" "));
  const [urls] = useState(getUrlInText(message.content));

  return (
    <CardComponent>
      <Flex gap={2} textColor={"gray.200"} fontWeight={"semibold"}>
        <Avatar name={message.sender.nickname} />
        <Flex direction={"column"}>
          <Text>{message.sender.nickname}</Text>
          <Text wordBreak={"break-word"}>
            {text.map((t, i) => {
              if (urls?.includes(t)) {
                console.log("URL", t);
                return (
                  <>
                    <Link key={i} color={"blue.500"} href={t} isExternal>
                      {t}
                    </Link>
                    {i === text.length - 1 ? "" : " "}
                  </>
                );
              } else {
                return `${t}${i === text.length - 1 ? "" : " "}`;
              }
            })}
          </Text>
        </Flex>
      </Flex>
    </CardComponent>
  );
};

export default MessageComponent;
