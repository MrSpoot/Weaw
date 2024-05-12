import MessageComponent from "../components/message.component";

const MessageListContainer: React.FC = () => {
  return (
    <>
      <div className="flex w-full gap-4">
        <div className="flex flex-col h-full w-1/2">
          <MessageComponent />
        </div>
        <div className="flex flex-col h-full w-1/2">
          <MessageComponent />
        </div>
      </div>
    </>
  );
};

export default MessageListContainer;
