import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Conversation } from "../types/conversation.type";

const ConversationComponent: FunctionComponent<{
  conversation: Conversation;
  onClick: (value: string) => void;
}> = ({ conversation, onClick }) => {
  const actualUser = useSelector((state: RootState) => state.users.actualUser);

  return (
    <div className="mx-2 my-1">
      <div
        className="flex w-full justify-between rounded-lg bg-secondary items-center px-2 py-2 gap-4"
        onClick={() => onClick(conversation.id)}
      >
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded-full bg-white"></div>
          <div className="flex flex-col">
            <div className=" font-semibold">
              {conversation.users.length === 2
                ? conversation.users.find((u) => u.id !== actualUser?.id)
                    ?.nickname
                : conversation.id}
            </div>
            <div className="font-light">
              {conversation.users.length === 2
                ? conversation.users.find((u) => u.id !== actualUser?.id)?.id
                : conversation.created}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center px-4">X</div>
      </div>
    </div>
  );
};

export default ConversationComponent;
