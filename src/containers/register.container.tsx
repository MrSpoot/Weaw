import { useState } from "react";
import svg from "../assets/layered-waves-haikei.svg";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.services";
import { useToast } from "@chakra-ui/react";

const RegisterContainer: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    signUp({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    }).then((r) => {
      toast({
        title: "Register success",
        status: "success",
        isClosable: true,
        duration: 5000,
        position: "bottom-left",
      });
      navigate("/auth/login");
    });
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div
          className="flex rounded-3xl shadow-2xl p-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${svg})`,
          }}
        >
          <div className="flex flex-col gap-4">
            <span className=" text-white text-5xl font-bold mt-8">
              Create new account
            </span>
            <span className=" text-md text-gray-400 mb-8">
              Already A Member ?
              <span
                className="text-md text-[#fa7268] hover:text-[#ef5f67]"
                onClick={() => navigate("/auth/login")}
              >
                {" Log In"}
              </span>
            </span>
            <div className="flex flex-col gap-4 w-11/12 items-center">
              <div className="flex w-full gap-4">
                <InputComponent
                  placeholder="Firstname"
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <InputComponent
                  placeholder="Lastname"
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <InputComponent
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                <ButtonComponent text="Sign In" onClick={register} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterContainer;
