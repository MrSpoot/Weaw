import { FunctionComponent } from "react";

const ButtonComponent: FunctionComponent<{
  text?: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <div
      className="flex w-full h-10 rounded-lg bg-[#386FA9] items-center justify-center hover:bg-[#2C5682]"
      onClick={onClick}
    >
      <p className="font-semibold text-white">{text}</p>
    </div>
  );
};

export default ButtonComponent;
