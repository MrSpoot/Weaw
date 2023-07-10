import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import loginService from "../services/login.service";
import { useState } from "react";
import { Login } from "../types/login.type";
import { useRoute } from "../providers/route.provider";

const LoginContainer = () => {
  const { navigateTo } = useRoute();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex justify-center items-center h-full w-full bg-[#0f5960]">
        <div className="flex w-1/2 h-1/2 rounded-3xl shadow-xl">
          <div className="flex justify-center items-center h-full w-1/2 bg-[#f8f8f8] rounded-l-3xl">
            <img
              alt="logo-winggy"
              className="w-1/3 aspect-square"
              src="https://www.betterfly-tourism.com/wp-content/uploads/2018/10/logo-winggy.png"
            ></img>
          </div>
          <div className="flex h-full  w-1/2 bg-[#dddfd4] rounded-r-3xl">
            <div className="flex h-full w-full justify-center items-center">
              <div className="flex flex-col w-3/4 gap-4">
                <InputComponent setValue={setLogin} placeholder="Username" />
                <InputComponent
                  secret
                  setValue={setPassword}
                  placeholder="Password"
                />
                <div className="flex flex-col px-2 mt-2 gap-2">
                  <ButtonComponent
                    text="Sign In"
                    onClick={() => {
                      login &&
                        password &&
                        loginService
                          .login({ login: login, password: password })
                          .then(() => {
                            console.log("alloooooo");
                            navigateTo("/companies");
                          });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-screen">
        <div className="w-full flex justify-center text-xs text-[#f8f8f8]">
          Version 3.0.9 | Git 0fzg5e6sdc | Schema 3.0.6
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
