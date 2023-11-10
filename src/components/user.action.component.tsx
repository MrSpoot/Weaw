import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User, UserStatus } from "../types/user.type";

const getStatus = (status: UserStatus) => {
  switch (status) {
    case "ONLINE":
      return (
        <AvatarBadge borderColor="green.100" bg="green.300" boxSize="1em" />
      );
    case "OFFLINE":
    case "INVISIBLE":
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

const UserActionComponent: React.FC<{
  user: User;
  onClick: (user: User) => void;
}> = ({ user, onClick }) => {
  const userState = useSelector((state: RootState) => state.users);

  return (
    <>
      {userState.actualUser && (
        <Box
          p={2}
          bg="backgroundColor.600"
          onClick={() => onClick(user)}
          textColor={"gray.400"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex gap={3}>
              <Avatar size="md">
                {getStatus(userState.actualUser.userStatus)}
              </Avatar>
              <Flex direction={"column"} justifyContent={"center"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {user.nickname}
                </Text>
                <Text fontSize={"xs"}>{userState.actualUser.userStatus}</Text>
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
      )}
    </>
  );
};

export default UserActionComponent;
