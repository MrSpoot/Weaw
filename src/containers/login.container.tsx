import { useEffect, useState } from "react";
import { useRoute } from "../providers/route.provider";
import {
  Center,
  Flex,
  Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Box,
  Text,
  Progress,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  useSteps,
  InputRightElement,
  FormControl,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { EmailIcon, InfoIcon, LockIcon, ViewIcon } from "@chakra-ui/icons";
import { User } from "../types/user.type";
import loginService from "../services/login.service";
import { Login } from "../types/login.type";
import { useWebSocket } from "../providers/websocket.provider";

const LoginContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegistrationForm toggleForm={toggleForm} />
      )}
    </>
  );
};

const LoginForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { navigateTo } = useRoute();
  const { connect } = useWebSocket();

  return (
    <Center h="100vh" bg="gray.100">
      <Flex
        direction="column"
        p={8}
        rounded={16}
        w="md"
        bg="white"
        boxShadow="lg"
        gap={6}
      >
        <Heading textAlign="center">Se connecter</Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <InputGroup>
              <InputLeftElement children={<EmailIcon color="gray.300" />} />
              <Input
                type="email"
                placeholder="Adresse email"
                onChange={(e) => setLogin(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <InputGroup>
            <InputLeftElement children={<LockIcon color="gray.300" />} />
            <Input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </VStack>
        <Box gap={6}>
          <HStack justify="space-between" mb={4}>
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="text" color={"blue.500"} size="sm">
              Forgot password?
            </Button>
          </HStack>

          <Button
            colorScheme="blue"
            w="full"
            onClick={() => {
              console.log(process.env.REACT_APP_SERVER_DOMAIN);
              console.log(process.env.REACT_APP_SERVER_PORT);
              login &&
                password &&
                loginService
                  .login({ login: login, password: password })
                  .then((token) => {
                    connect(token);
                  })
                  .then(() => navigateTo("app"));
            }}
          >
            Connexion
          </Button>
        </Box>
        <Center>
          <Text mt={2} color="gray.500">
            Pas encore de compte ?
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              ml={1}
              onClick={toggleForm}
            >
              S'inscrire
            </Text>
          </Text>
        </Center>
      </Flex>
    </Center>
  );
};

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
];

const RegistrationForm: React.FC<{ toggleForm: () => void }> = ({
  toggleForm,
}) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const activeStepText = steps[activeStep].description;

  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  const [user, setUser] = useState<User>({
    id: undefined,
    nickname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Center h="100vh" bg="gray.100">
      <Flex
        direction="column"
        p={8}
        rounded={16}
        w="md"
        bg="white"
        boxShadow="lg"
      >
        <Heading mb={6} textAlign="center">
          S'inscrire
        </Heading>
        <Box position="relative" mb={6}>
          <Stepper size="sm" index={activeStep} gap="0">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator bg="white" zIndex={5}>
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
              </Step>
            ))}
          </Stepper>
          <Progress
            value={progressPercent}
            position="absolute"
            height="3px"
            width="full"
            top="10px"
          />
        </Box>
        <FormControl>
          <VStack spacing={4} align="stretch">
            {activeStep === 1 && (
              <>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon color="gray.300" />} />
                  <Input
                    type="email"
                    placeholder="Adresse email"
                    onChange={(e) =>
                      setUser((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon color="gray.300" />} />
                  <Input
                    type="text"
                    placeholder="Pseudo"
                    onChange={(e) =>
                      setUser((prevState) => ({
                        ...prevState,
                        nickname: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </>
            )}
            {activeStep === 2 && (
              <>
                <InputGroup>
                  <InputLeftElement children={<LockIcon color="gray.300" />} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    onChange={(e) =>
                      setUser((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }))
                    }
                  />
                  <InputRightElement
                    children={
                      <ViewIcon
                        color="gray.300"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement children={<LockIcon color="gray.300" />} />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmer le mot de passe"
                    errorBorderColor="crimson"
                    isInvalid={
                      user.password !== confirmPassword &&
                      confirmPassword.length > 0
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement
                    children={
                      <ViewIcon
                        color="gray.300"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    }
                  />
                </InputGroup>
              </>
            )}
          </VStack>
        </FormControl>
        <Flex mt={6} justify="space-between">
          {activeStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setActiveStep((s) => s - 1)}
            >
              Précédent
            </Button>
          )}
          {activeStep < 2 ? (
            <Button
              colorScheme="blue"
              onClick={() => setActiveStep((s) => s + 1)}
            >
              Suivant
            </Button>
          ) : (
            <Button
              colorScheme="green"
              onClick={() => {
                loginService.register(user).then(toggleForm);
              }}
            >
              Soumettre
            </Button>
          )}
        </Flex>
        <Center mt={4}>
          <Text mt={2} color="gray.500">
            Déjà un compte?
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              ml={1}
              onClick={toggleForm}
            >
              Se connecter
            </Text>
          </Text>
        </Center>
      </Flex>
    </Center>
  );
};

export default LoginContainer;
