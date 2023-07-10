import { FunctionComponent } from "react";

const ButtonComponent: FunctionComponent<{
  text?: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <div
      className="flex w-full h-10 rounded-lg bg-[#3fb0ac] items-center justify-center hover:bg-[#0f5960] hover:scale-95"
      onClick={onClick}
    >
      <p className="font-semibold text-white">{text}</p>
    </div>
  );
};

export default ButtonComponent;
