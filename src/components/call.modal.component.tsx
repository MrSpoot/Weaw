import { PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Text,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { PhoneXMarkIcon } from "./icon.components";
import ringer from "../resources/discord-call-sound.mp3";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CallModalComponent: React.FC = () => {
  const callState = useSelector((state: RootState) => state.call);

  const audio = new Audio(ringer);
  audio.loop = true;

  const isOpen = false;

  useEffect(() => {
    if (isOpen) {
      audio.play();
    } else {
      audio.pause();
    }
  }, []);

  return (
    <Modal isOpen={callState.calling} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent rounded={"2xl"}>
        <ModalBody p={8} aspectRatio={"1/1"}>
          <Flex
            direction={"column"}
            alignItems={"center"}
            h={"full"}
            justifyContent={"space-evenly"}
          >
            <AvatarGroup max={2}>
              <Avatar size={"xl"}></Avatar>
            </AvatarGroup>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              MrSpoot is calling
            </Text>
            <HStack justifyContent={"space-evenly"} w={"full"}>
              <Flex direction={"column"} gap={2} alignItems={"center"}>
                <Flex>
                  <IconButton
                    size={"lg"}
                    rounded={"full"}
                    colorScheme={"green"}
                    aria-label={"accept-call"}
                  >
                    <PhoneIcon />
                  </IconButton>
                </Flex>

                <Text fontWeight={"semibold"}>Join Call</Text>
              </Flex>

              <Flex direction={"column"} gap={2} alignItems={"center"}>
                <Flex>
                  <IconButton
                    size={"lg"}
                    rounded={"full"}
                    colorScheme={"red"}
                    aria-label={"accept-call"}
                  >
                    <PhoneXMarkIcon />
                  </IconButton>
                </Flex>
                <Text fontWeight={"semibold"}>Decline</Text>
              </Flex>
            </HStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CallModalComponent;
