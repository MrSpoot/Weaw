import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

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

const UserCardComponent: React.FC = () => {
  const phrases: string[] = ["online", "red", "absent", "disconnect"];

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  return (
    <Box px={4} py={2} bg="blue.100" rounded={8}>
      <Flex gap={4}>
        <Avatar>{getStatus(handleRandomize())}</Avatar>
        <Flex direction={"column"}>
          <Text>Jean</Text>
          <Text fontSize={"sm"}>Jean</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserCardComponent;
