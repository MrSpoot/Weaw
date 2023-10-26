import { Avatar, AvatarBadge, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { User } from "../types/user.type";
import { SettingsIcon } from "@chakra-ui/icons";

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

const UserActionComponent: React.FC<{
  user: User;
  onClick: (user: User) => void;
}> = ({ user, onClick }) => {
  const phrases: string[] = ["online", "red", "absent", "disconnect"];

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  return (
    <Box p={2} bg="blue.100" onClick={() => onClick(user)}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex gap={3}>
          <Avatar size="md">{getStatus(handleRandomize())}</Avatar>
          <Flex direction={"column"} justifyContent={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.nickname}
            </Text>
            <Text fontSize={"xs"}>En ligne</Text>
          </Flex>
        </Flex>

        <Flex gap={1}>
          {/* <SettingsIcon
            p={1}
            boxSize={7}
            color={"gray.500"}
            _hover={{ bg: "blue.200" }}
            rounded={5}
          />
          <SettingsIcon
            p={1}
            boxSize={7}
            color={"gray.500"}
            _hover={{ bg: "blue.200" }}
            rounded={5}
          /> */}
          <SettingsIcon
            p={1}
            boxSize={7}
            color={"gray.500"}
            _hover={{ bg: "blue.200" }}
            rounded={5}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserActionComponent;
