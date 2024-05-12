import { Input } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

const InputComponent: React.FC<{
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, type, onChange }) => {
  return (
    <>
      <Input
        textColor={"whitesmoke"}
        bgColor={"#0e0e10"}
        h={"3.5rem"}
        w={"100%"}
        rounded={"9999px"}
        border={"none"}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      ></Input>
    </>
  );
};

export default InputComponent;
