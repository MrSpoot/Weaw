import InputComponent from "../components/input.component";
import { LuHeadphones, LuMic, LuSettings } from "react-icons/lu";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import MessageComponent from "../components/message.component";
import MessageListContainer from "./message-list.container";

const AppContainer: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-grow">
        <div className="flex flex-col w-20">
          <div className="flex bg-[#1d1d21] h-24 w-full"></div>
          <div className="flex bg-[#272833] h-0.5"></div>
          <div className="flex flex-grow bg-[#1d1d21] w-full"></div>
        </div>
        <div className="flex flex-col w-1/6">
          <div className="flex bg-[#1a1a1d] h-24 w-full"></div>
          <div className="flex bg-[#272833] h-0.5"></div>
          <div className="flex flex-grow bg-[#1a1a1d] w-full"></div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex bg-[#0e0e10] h-24"></div>
          <div className="flex bg-[#272833] h-0.5"></div>
          <div className="flex flex-1 bg-[#0e0e10] p-8">
            <MessageListContainer />
          </div>
        </div>
        <div className="flex bg-[#1a1a1d] w-96"></div>
      </div>
      <div className="flex bg-[#1d1d21] h-20 p-4">
        <div className="flex w-full h-full items-center gap-8">
          <div className="flex w-1/4"></div>
          <div className="flex w-1/2">
            <InputComponent
              placeholder={""}
              type={"text"}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-row-reverse w-1/4 p-4 items-center gap-16">
            <div className="flex gap-2">
              <LuHeadphones size="1.5em" color="#504f59" />
              <LuMic size="1.5em" color="#504f59" />
              <LuSettings size="1.5em" color="#504f59" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Avatar
                name="Oshigaki Kisame"
                size={"md"}
                src="https://bit.ly/broken-link"
              >
                <AvatarBadge
                  borderColor="green.200"
                  bg="green.500"
                  boxSize="1em"
                />
              </Avatar>
              <span className=" text-white">MrSpoot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
