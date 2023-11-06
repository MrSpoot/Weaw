import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRoute } from "../providers/route.provider";
import loginService from "../services/login.service";
import { Center, Spinner } from "@chakra-ui/react";

const VerifyAccountContainer = () => {
  const [searchParams] = useSearchParams();
  const { navigateTo } = useRoute();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      loginService
        .verifyAccount(token)
        .then((res) => {
          if (res === true) {
            navigateTo("auth");
          } else {
            navigateTo("auth");
          }
        })
        .catch(() => navigateTo("auth"));
    } else {
      navigateTo("auth");
    }
  }, []);

  return (
    <Center h={"full"}>
      <Spinner size={"xl"} />
    </Center>
  );
};

export default VerifyAccountContainer;
