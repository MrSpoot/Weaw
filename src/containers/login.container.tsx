import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import loginService from "../services/login.service";
import { useEffect, useState } from "react";
import { useRoute } from "../providers/route.provider";
import ProgressBarComponent from "../components/progress-bar.component";

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

  const [registerPage, setRegisterPage] = useState(1);

  useEffect(() => {
    setRegisterPage(1);
    setFirstname("");
    setLastname("");
    setNickname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [isRegistering]);

  function registerFunction() {
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
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center rounded-3xl bg-white shadow-2xl shadow-background-dark px-16 py-12 border-2 border-gray-100 gap-6 ">
          {isRegistering ? (
            <>
              <div className="w-full text-xl font-semibold text-[#6059e8]">
                Register
              </div>
              <ProgressBarComponent step={3} actualStep={registerPage} />
              {registerPage === 1 && (
                <>
                  <InputComponent
                    placeholder="Firstname"
                    setValue={setFirstname}
                  />
                  <InputComponent
                    placeholder="Lastname"
                    setValue={setLastname}
                  />
                </>
              )}
              {registerPage === 2 && (
                <>
                  <InputComponent placeholder="Email" setValue={setEmail} />
                  <InputComponent
                    placeholder="Nickname"
                    setValue={setNickname}
                  />
                </>
              )}
              {registerPage === 3 && (
                <>
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
                </>
              )}
              <div className="w-3/4 px-2">
                {registerPage === 3 ? (
                  <ButtonComponent
                    text={"Sign up"}
                    onClick={registerFunction}
                  />
                ) : (
                  <ButtonComponent
                    text={"Next"}
                    onClick={() => setRegisterPage(registerPage + 1)}
                  />
                )}
              </div>
              <div className="flex gap-1">
                <div className=" text-gray-800 flex-nowrap">
                  {"Already have an account ?"}
                </div>
                <div
                  className="text-[#6059e8] hover:text-secondary-dark font-bold"
                  onClick={() => setIsRegistering(false)}
                >
                  {"Sign In"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full text-xl font-semibold text-[#6059e8]">
                Login
              </div>
              <InputComponent placeholder="Username" setValue={setLogin} />
              <InputComponent
                placeholder="Password"
                secret
                setValue={setPassword}
              />
              <div className="w-3/4 px-2">
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
                <div className=" text-gray-800">
                  {"Don't have an account ?"}
                </div>
                <div
                  className="text-[#6059e8] hover:text-secondary-dark font-bold"
                  onClick={() => setIsRegistering(true)}
                >
                  {"Sign Up"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
