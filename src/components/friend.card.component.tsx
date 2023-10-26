import { Avatar, AvatarBadge, Flex, Text } from "@chakra-ui/react";
import { User } from "../types/user.type";
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

const FriendCardComponent: React.FC<{
  user: User;
  onClick: (user: User) => void;
}> = ({ user, onClick }) => {
  const phrases: string[] = ["online", "red", "absent", "disconnect"];

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  return (
    <CardComponent onClick={() => onClick(user)}>
      <Flex gap={4}>
        <Avatar>{getStatus(handleRandomize())}</Avatar>
        <Flex direction={"column"}>
          <Text>{user.nickname}</Text>
          <Text fontSize={"sm"}>En ligne</Text>
        </Flex>
      </Flex>
    </CardComponent>
  );
};

export default FriendCardComponent;
