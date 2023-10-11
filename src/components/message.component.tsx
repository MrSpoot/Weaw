import { FunctionComponent } from "react";
import { Message } from "../types/message.type";

const MessageComponent: FunctionComponent<{ message: Message }> = ({
  message,
}) => {
  return (
    <div className="flex bg-red-400 rounded-xl p-4">
      <div>{message.content}</div>
    </div>
  );
};

export default MessageComponent;
