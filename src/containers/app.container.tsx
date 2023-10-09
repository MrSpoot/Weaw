import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import { useState } from "react";
import { useRoute } from "../providers/route.provider";
import ConversationComponent from "../components/conversation.component";
import ServerBubbleComponent from "../components/server.bubble.component";
import SimpleBar from "simplebar-react";

const AppContainer = () => {
  const { navigateTo } = useRoute();

  return (
    <>
      <div className="flex h-full w-full">
        <div className="flex h-full">
          <div className="flex flex-col bg-red-300 h-full overflow-y-scroll">
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
            <ServerBubbleComponent />
          </div>
          <div className="flex flex-col w-4/6 bg-yellow-200 h-full overflow-y-scroll">
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
            <ConversationComponent />
          </div>
        </div>
        <div className="w-10/12 h-full"></div>
      </div>
    </>
  );
};

export default AppContainer;
