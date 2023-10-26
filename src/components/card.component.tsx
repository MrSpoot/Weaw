import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  ContainerProps,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { request } from "http";

const CardComponent: React.FC<{
  children: React.ReactNode;
  onClick?: (...args: any[]) => any;
}> = ({ children, onClick = () => {} }) => {
  return (
    <Box px={4} py={2} bg="blue.100" rounded={8} onClick={onClick}>
      {children}
    </Box>
  );
};

export default CardComponent;
