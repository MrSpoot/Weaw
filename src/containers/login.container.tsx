import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import loginService from "../services/login.service";
import { useState } from "react";
import { useRoute } from "../providers/route.provider";

const LoginContainer = () => {
  const { navigateTo } = useRoute();

  const [login, setLogin] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col aspect-square items-center rounded-3xl bg-background shadow-2xl shadow-background-dark px-16 py-12 gap-12 ">
          {isRegistering ? (
            <>
              <div className="rounded-full h-24 w-24 bg-white"></div>
              <div className="grid grid-cols-2 w-full gap-6 justify-center">
                <InputComponent
                  placeholder="Firstname"
                  setValue={setFirstname}
                />
                <InputComponent placeholder="Lastname" setValue={setLastname} />
                <InputComponent placeholder="Email" setValue={setEmail} />
                <InputComponent placeholder="Nickname" setValue={setNickname} />
                <InputComponent
                  placeholder="Password"
                  secret
                  setValue={setPassword}
                />
                <InputComponent
                  placeholder="Confirm Password"
                  secret
                  onError={
                    confirmPassword.length > 0 && confirmPassword !== password
                  }
                  onErrorText="Password must match"
                  setValue={setConfirmPassword}
                />
              </div>
              <div className="pt-6 w-3/4 px-2">
                <ButtonComponent
                  text="Sign Up"
                  onClick={() => {
                    confirmPassword.length > 0 &&
                      confirmPassword === password &&
                      loginService.register({
                        id: "",
                        firstname: firstname,
                        lastname: lastname,
                        nickname: nickname,
                        email: email,
                        password: password,
                      });
                  }}
                />
              </div>
              <div className="flex gap-1">
                <div className=" text-gray-100 flex-nowrap">
                  {"Already have an account ?"}
                </div>
                <div
                  className="text-secondary hover:text-secondary-dark font-bold"
                  onClick={() => setIsRegistering(false)}
                >
                  {"Sign In"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-full h-24 w-24 bg-white"></div>
              <div className="flex flex-col w-full gap-6 justify-center">
                <InputComponent placeholder="Username" setValue={setLogin} />
                <InputComponent
                  placeholder="Password"
                  secret
                  setValue={setPassword}
                />
                <div className="pt-6 px-2">
                  <ButtonComponent
                    text="Sign In"
                    onClick={() => {
                      loginService
                        .login({ login: login, password: password })
                        .then(() => {
                          navigateTo("app");
                        })
                        .catch();
                    }}
                  />
                </div>
                <div className="flex gap-1 justify-center">
                  <div className=" text-gray-100">
                    {"Don't have an account ?"}
                  </div>
                  <div
                    className="text-secondary hover:text-secondary-dark font-bold"
                    onClick={() => setIsRegistering(true)}
                  >
                    {"Sign Up"}
                  </div>
                </div>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
