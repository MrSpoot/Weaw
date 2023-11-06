import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  CameraIcon,
  MicrophoneIcon,
  PhoneXMarkIcon,
  SpeakerIcon,
  SpeakerMutedIcon,
} from "../components/icon.components";

const CallContainer = () => {
  const [webcamIsActive, setWebcamIsActive] = useState(false);
  const [soundIsMuted, setSoundIsMuted] = useState(false);

  return (
    <>
      <Flex direction={"column"} flex={1}>
        <Flex
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          overflowY={"auto"}
        >
          <Flex gap={2} flexWrap={"wrap"} justifyContent={"center"}>
            <UserCallingCardComponent webcamIsActive={webcamIsActive} />
            <UserCallingCardComponent webcamIsActive={webcamIsActive} />
            <UserCallingCardComponent webcamIsActive={webcamIsActive} />
            <UserCallingCardComponent webcamIsActive={webcamIsActive} />
            <UserCallingCardComponent webcamIsActive={webcamIsActive} />
          </Flex>
        </Flex>

        <Flex py={4} justifyContent={"center"} bg={"blackAlpha.100"}>
          <Flex gap={8}>
            <IconButton
              aria-label={""}
              size={"lg"}
              rounded={"full"}
              onClick={() => {
                setWebcamIsActive(!webcamIsActive);
              }}
            >
              <CameraIcon></CameraIcon>
            </IconButton>
            <IconButton
              aria-label={""}
              size={"lg"}
              rounded={"full"}
              onClick={() => setSoundIsMuted(!soundIsMuted)}
            >
              {soundIsMuted ? <SpeakerMutedIcon /> : <SpeakerIcon />}
            </IconButton>
            <IconButton aria-label={""} size={"lg"} rounded={"full"}>
              <MicrophoneIcon></MicrophoneIcon>
            </IconButton>
            <IconButton
              aria-label={"ring-off"}
              colorScheme="red"
              size={"lg"}
              rounded={"full"}
            >
              <PhoneXMarkIcon></PhoneXMarkIcon>
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const UserCallingCardComponent: React.FC<{ webcamIsActive: boolean }> = ({
  webcamIsActive,
}) => {
  const webcamRef = useRef<Webcam | null>(null);

  const [loading, setLoading] = useState(true);

  const handleUserMedia = () => setTimeout(() => setLoading(false), 1_000);

  return (
    <Box rounded={"lg"} bg={"purple"} aspectRatio={"16/9"} w={500}>
      {webcamIsActive ? (
        <Center
          overflow={"hidden"}
          aspectRatio={"16/9"}
          rounded={"lg"}
          position={"relative"}
        >
          {loading && <Spinner size={"xl"} colorScheme={"gray"} />}

          <Webcam
            ref={webcamRef as React.MutableRefObject<Webcam>}
            onUserMedia={handleUserMedia}
          />

          <Flex position={"absolute"} bottom={2} left={2}>
            <Text
              textColor={"gray.100"}
              bg={"blackAlpha.300"}
              py={1}
              px={4}
              rounded={"md"}
            >
              MrSpoot
            </Text>
          </Flex>
        </Center>
      ) : (
        <Center
          overflow={"hidden"}
          aspectRatio={"16/9"}
          rounded={"lg"}
          position={"relative"}
        >
          <Avatar size={"xl"} />
          <Flex position={"absolute"} bottom={2} left={2}>
            <Text
              textColor={"gray.100"}
              bg={"blackAlpha.300"}
              py={1}
              px={4}
              rounded={"md"}
            >
              MrSpoot
            </Text>
          </Flex>
        </Center>
      )}
    </Box>
  );
};

export default CallContainer;
