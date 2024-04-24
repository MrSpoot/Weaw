import { HTMLInputTypeAttribute } from "react";

const InputComponent: React.FC<{
  placeholder: string;
  type: HTMLInputTypeAttribute;
}> = ({ placeholder, type }) => {
  return (
    <>
      <input
        className="bg-gray-200 rounded-xl w-full h-14 pl-4"
        placeholder={placeholder}
        type={type}
      ></input>
    </>
  );
};

export default InputComponent;
