import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Message } from "../types/message.type";

const MessageComponent: FunctionComponent<{ message: Message }> = ({
  message,
}) => {
  const actualUser = useSelector((state: RootState) => state.users).actualUser;

  return (
    <div
      className={`flex ${
        message.sender.id === actualUser?.id ? "bg-red-400" : "bg-green-400"
      }  rounded-xl p-4`}
    >
      <div>{message.content}</div>
    </div>
  );
};

export default MessageComponent;
