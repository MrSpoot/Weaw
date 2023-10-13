import { FunctionComponent } from "react";

const InputComponent: FunctionComponent<{
  placeholder?: string;
  setValue?: (value: string) => void;
  secret?: boolean;
  onErrorText?: string;
  onError?: boolean;
}> = ({
  placeholder,
  setValue,
  secret = false,
  onErrorText,
  onError = false,
}) => {
  return (
    <div>
      <input
        className="w-full h-12 rounded-lg p-4 focus:outline-none border-[#6059e8] border-2"
        type={secret ? "password" : "text"}
        placeholder={placeholder}
        onChange={(event) => setValue && setValue(event.target.value)}
      ></input>
      {onError && (
        <div className=" text-sm font-bold text-red-400">
          {"* " + onErrorText}
        </div>
      )}
    </div>
  );
};

export default InputComponent;
