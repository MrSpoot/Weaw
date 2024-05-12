const ChatComponent: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex h-24 bg-[#0e0e10]"></div>
      <div className="flex bg-[#2e2e30] h-0.5"></div>
      <div className="flex flex-grow bg-[#0e0e10]"></div>
      <div className="flex h-24 bg-[#1d1d21] items-center justify-center p-4">
        <div className="flex w-3/4 bg-[#0e0e10] rounded-full h-full p-2">
          <div className="flex bg-red-400 h-full aspect-square rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
