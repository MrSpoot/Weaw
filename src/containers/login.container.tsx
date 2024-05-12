import { useState } from "react";
import svg from "../assets/layered-waves-haikei.svg";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import { Navigate, useNavigate } from "react-router-dom";
import { Avatar, Button, useToast } from "@chakra-ui/react";
import { signIn } from "../services/auth.services";

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    signIn({
      username: username,
      password: password,
    })
      .then((r) => {
        toast({
          title: "Login success",
          status: "success",
          isClosable: true,
          duration: 10000,
          position: "bottom-left",
        });
        navigate("/app");
      })
      .catch((r) =>
        toast({
          title: "Login error",
          status: "error",
          isClosable: true,
          duration: 10000,
          position: "bottom-left",
        })
      );
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div
          className="flex rounded-3xl shadow-2xl p-16 bg-center"
          style={{
            backgroundImage: `url(${svg})`,
          }}
        >
          <div className="flex flex-col gap-4">
            <span className="text-5xl font-bold text-white">
              Login to account
            </span>
            <span className=" text-md text-gray-400 mb-8">
              Not A Member ?
              <span
                className="text-md text-[#fa7268] hover:text-[#ef5f67]"
                onClick={() => navigate("/auth/register")}
              >
                {" Sign In"}
              </span>
            </span>
            <div className="flex flex-col gap-4 w-11/12 items-center">
              <InputComponent
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputComponent
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex w-1/2 gap-4 mt-8">
                <ButtonComponent text="Log In" onClick={login} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
