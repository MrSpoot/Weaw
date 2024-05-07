import { useState } from "react";
import svg from "../assets/layered-waves-haikei.svg";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";

const LoginContainer: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <>
      <div className="flex bg-gray-300 w-screen h-screen">
        <div className="flex w-full h-full justify-center items-center">
          <div
            className="flex rounded-3xl shadow-2xl p-16 bg-cover bg-center"
            style={{
              backgroundImage: `url(${svg})`,
            }}
          >
            <div className="flex flex-col gap-4">
              <span className="text-5xl font-bold text-white">
                Login to account
                <span className="text-5xl font-bold text-[#fa7268]">.</span>
              </span>
              <span className=" text-md text-gray-400 mb-8">
                Not A Member ?
                <span className="text-md text-[#fa7268]">{" Sign In"}</span>
              </span>
              <div className="flex flex-col gap-4 w-11/12">
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
                <div className="flex w-full gap-4 mt-8">
                  <ButtonComponent text="Back" />
                  <ButtonComponent text="Create account" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
