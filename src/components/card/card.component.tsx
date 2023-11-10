import { Box, Flex } from "@chakra-ui/react";

const CardComponent: React.FC<{
  children: React.ReactNode;
  onClick?: (...args: any[]) => any;
}> = ({ children, onClick = () => {} }) => {
  return (
    <Box
      px={4}
      py={2}
      _hover={{ bg: "backgroundColor.100" }}
      rounded={8}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default CardComponent;
