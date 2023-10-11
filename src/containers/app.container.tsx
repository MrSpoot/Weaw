import { useNavigate } from "react-router-dom";
import ConversationComponent from "../components/conversation.component";
import ServerBubbleComponent from "../components/server.bubble.component";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import MessageListComponent from "../components/message.list.component";
import InputComponent from "../components/input.component";

const AppContainer = () => {
  const conversations = useSelector((state: RootState) => state.conversations);

  const [selectedConversation, setSelectedConversation] = useState<string>();

  return (
    <>
      <div className="flex h-full w-full">
        <div className="flex h-full">
          <div className="flex flex-col bg-secondary-dark h-full overflow-y-scroll">
            <ServerBubbleComponent />
          </div>
          <div className="flex flex-col w-4/6 bg-background h-full overflow-y-scroll">
            {conversations.map((conv) => {
              return (
                <ConversationComponent
                  key={conv.conversation.id}
                  conversation={conv.conversation}
                  onClick={setSelectedConversation}
                />
              );
            })}
          </div>
        </div>
        <div className="w-10/12 h-full">
          {selectedConversation && (
            <div className="flex flex-col h-full justify-end p-4 gap-8">
              <div className="flex flex-grow overflow-y-scroll">
                <MessageListComponent conversationId={selectedConversation} />
              </div>
              <div>
                <InputComponent placeholder="TEST" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppContainer;
