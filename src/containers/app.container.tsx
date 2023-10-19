import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import UserCardComponent from "../components/user.card.component";

interface ChannelProps {
  name: string;
}

const Channel: React.FC<ChannelProps> = ({ name }) => (
  <Box py={2} px={4} _hover={{ bg: "gray.600", cursor: "pointer" }}>
    #{name}
  </Box>
);

interface MessageProps {
  author: string;
  content: string;
}

const Message: React.FC<MessageProps> = ({ author, content }) => (
  <Flex direction="row" p={3} bg="blue.100" rounded={16} w="100%">
    <Box w="40px" h="40px" borderRadius="full" bg="blue.500" mr={4} />
    <VStack align="start" spacing={1}>
      <Text fontWeight="bold">{author}</Text>
      <Text>{content}</Text>
    </VStack>
  </Flex>
);

const AppContainer: React.FC = () => {
  return (
    <Box minH="100vh" bg="gray.200">
      <Flex h="100vh" justify={"flex-start"}>
        <Flex
          direction="column"
          bg="gray.300"
          w="80px"
          justifyContent="space-between"
        >
          <VStack gap="2" p={4}>
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
            <Box w="50px" h="50px" borderRadius="full" bg="blue.500" />
          </VStack>
          <VStack mb={4} justify={"flex-end"}>
            <Button w="50px" h="50px" colorScheme="blue" rounded={"full"}>
              <AddIcon />
            </Button>
          </VStack>
        </Flex>

        {/* Channel List */}
        <Flex
          direction="column"
          w="240px"
          bg="gray.850"
          overflowY="auto"
          p={2}
          gap={1}
        >
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
          <UserCardComponent />
        </Flex>

        <VStack flex={1}>
          {/* Chat Area */}
          <Flex direction={"row"} h="100vh" overflowY="auto">
            <Flex
              direction="column-reverse"
              overflowY="auto"
              gap={2}
              w={"100%"}
            >
              <Message author="John" content="Hello, how are you?" />
              <Message author="Doe" content="I'm fine, thank you!" />
              <Message author="John" content="Hello, how are you?" />
              <Message author="Doe" content="I'm fine, thank you!" />
              <Message author="John" content="Hello, how are you?" />
              <Message author="Doe" content="I'm fine, thank you!" />
              <Message author="John" content="Hello, how are you?" />
              <Message author="Doe" content="I'm fine, thank you!" />
              <Message author="John" content="Hello, how are you?" />
              <Message author="Doe" content="I'm fine, thank you!" />
              <Message author="John" content="Hello, how are you?" />
              <Message author="Doe" content="I'm fine, thank you!" />
            </Flex>
          </Flex>

          {/* Message Input */}
          <Box bg="gray.850" p={4} w={"100%"}>
            <Input
              placeholder="Type your message here..."
              variant="filled"
              size="lg"
            />
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AppContainer;
