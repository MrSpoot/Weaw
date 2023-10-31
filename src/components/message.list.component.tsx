import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../reducer/slice/conversationSlice";
import { RootState } from "../store";
import MessageComponent from "./message.component";

const MessageListComponent: FunctionComponent<{ conversationId: string }> = ({
  conversationId,
}) => {
  const conversations = useSelector((state: RootState) => state.conversations);

  const conversation = conversations.find(
    (c) => c.conversation.id === conversationId
  );

  const messages = conversation?.messages || [];

  return (
    <>
      {conversation && (
        <div className="w-full">
          <div className="flex flex-col-reverse w-full h-full p-4 gap-2">
            {messages.map((m, i) => (
              <MessageComponent key={messages[i].id} message={m} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageListComponent;
