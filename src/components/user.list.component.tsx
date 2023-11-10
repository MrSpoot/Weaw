import { Flex } from "@chakra-ui/react";
import { User } from "../types/user.type";
import UserCardComponent from "./card/user.card.component";

const UserListComponent: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <Flex>
      {users.map((user) => {
        return <UserCardComponent user={user} onClick={() => {}} />;
      })}
    </Flex>
  );
};

export default UserListComponent;
