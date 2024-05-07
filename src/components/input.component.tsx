import { HTMLInputTypeAttribute } from "react";

const InputComponent: React.FC<{
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, type, onChange }) => {
  return (
    <>
      <input
        className="bg-gray-200 rounded-xl w-full h-14"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      ></input>
    </>
  );
};

export default InputComponent;
