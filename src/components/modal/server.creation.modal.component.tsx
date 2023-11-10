import {
  Avatar,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "../../providers/route.provider";
import { AppDispatch } from "../../reducer/slice/conversationSlice";
import { addServer } from "../../reducer/slice/serverSlice";
import serverService from "../../services/server.service";

const ServerCreationModalComponent: React.FC<{
  isShow: boolean;
  onClose: () => void;
}> = ({ isShow, onClose }) => {
  const { navigateTo } = useRoute();
  const [serverName, setServerName] = useState("");
  const [serverDescription, setServerDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const createServer = () => {
    if (serverName.length > 4) {
      serverService.createServer(serverName, serverDescription).then((s) => {
        dispatch(addServer(s));
        onClose();
        navigateTo(`app/${s.id}/channel/${s.conversations[0].id}`);
      });
    }
  };

  return (
    <Modal isOpen={isShow} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent rounded={"2xl"} p={4}>
        <ModalCloseButton />
        <ModalHeader display={"flex"} justifyContent={"center"}>
          <Text>Crée ton serveur Weaw</Text>
        </ModalHeader>
        <ModalBody aspectRatio={"1/1"}>
          <Flex direction={"column"} gap={4}>
            <Flex justifyContent={"center"}>
              <Avatar size={"lg"} />
            </Flex>
            <Flex direction={"column"} gap={1}>
              <Text>Crée un nom pour ton serveur </Text>
              <Input
                placeholder="Le nom du serveur"
                variant="filled"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                isInvalid={serverName.length > 0 && serverName.length < 5}
              />
            </Flex>
            <Flex direction={"column"} gap={1}>
              <Text>Décris ce nouveau mon que tu crée</Text>
              <Input
                placeholder="La description du serveur"
                variant="filled"
                value={serverDescription}
                onChange={(e) => setServerDescription(e.target.value)}
              />
            </Flex>
            <Flex justifyContent={"center"}>
              <Button colorScheme="green" onClick={() => createServer()}>
                Créé
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServerCreationModalComponent;
