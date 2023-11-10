import { PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ringer from "../../resources/discord-call-sound.mp3";
import { RootState } from "../../store";
import { PhoneXMarkIcon } from "../icon.components";

const CallModalComponent: React.FC = () => {
  const callState = useSelector((state: RootState) => state.call);
  const userState = useSelector((state: RootState) => state.users);

  const audio = new Audio(ringer);
  audio.loop = true;

  useEffect(() => {
    if (callState.isCalling) {
      audio.play();
    } else {
      audio.pause();
    }
  }, []);

  return (
    <Modal isOpen={callState.isCalling} onClose={() => {}} isCentered>
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
              {callState.conversation?.users
                .filter((u) => u.id !== userState.actualUser?.id)
                .map((u) => (
                  <Avatar size={"xl"} name={u.nickname}></Avatar>
                ))}
            </AvatarGroup>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              MrSpoot is calling
            </Text>
            <HStack justifyContent={"space-evenly"} w={"full"}>
              {callState.direction === "RECEIVER" && (
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
              )}

              <Flex direction={"column"} gap={2} alignItems={"center"}>
                <Flex>
                  <IconButton
                    size={"lg"}
                    rounded={"full"}
                    colorScheme={"red"}
                    aria-label={"decline-call"}
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
