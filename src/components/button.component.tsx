import { FunctionComponent } from "react";

const ButtonComponent: FunctionComponent<{
  text?: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <div
      className="flex w-full h-10 rounded-lg bg-[#6059e8] hover:bg-secondary-dark items-center justify-center "
      onClick={onClick}
    >
      <p className="font-semibold text-white">{text}</p>
    </div>
  );
};

export default ButtonComponent;
