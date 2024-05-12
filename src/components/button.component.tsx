import { Button } from "@chakra-ui/react";

const ButtonComponent: React.FC<{ text: string; onClick?: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <>
      <Button
        bgColor={"#fa7268"}
        _hover={{ bg: "#ef5f67" }}
        rounded={"0.75rem"}
        w={"100%"}
        h={"3.5rem"}
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  );
};

export default ButtonComponent;
