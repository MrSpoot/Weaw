import { FunctionComponent } from "react";

const ConversationComponent: FunctionComponent<{
}> = () => {
  return (
    <div className="m-1">
        <div className="flex w-full justify-between rounded-lg bg-green-300 items-center px-2 py-2 gap-4">
            <div className="flex gap-2">
                <div className="w-12 h-12 rounded-full bg-white">

                </div>
                <div className="flex flex-col">
                    <div className=" font-semibold">
                        TEST
                    </div>
                    <div className="font-light">
                        STATUS
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center px-4">
                X
            </div>
        </div>
    </div>
  );
};

export default ConversationComponent;
