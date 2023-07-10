import { FunctionComponent } from "react";

const InputComponent: FunctionComponent<{
  placeholder?: string;
  setValue?: (value: string) => void;
  secret?: boolean;
}> = ({ placeholder, setValue, secret = false }) => {
  return (
    <input
      className="w-full h-10 rounded-lg p-4 focus:outline-none"
      type={secret ? "password" : "text"}
      placeholder={placeholder}
      onChange={(event) => setValue && setValue(event.target.value)}
    ></input>
  );
};

export default InputComponent;
