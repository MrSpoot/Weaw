import { useState } from "react";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";

const LoginContainer: React.FC = () => {
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const log = () => {
    console.log("Firstname", firstname);
    console.log("lastname", lastname);
    console.log("email", email);
    console.log("password", password);
  };

  return (
    <>
      <div className="flex bg-gray-300 w-screen h-screen">
        <div className="flex w-full h-full justify-center items-center">
          <div className="flex bg-white rounded-3xl h-3/5 aspect-video shadow-2xl p-6 ">
            <div className="flex flex-col gap-4">
              <span className=" text-5xl font-bold mt-8">
                Create new account
                <span className=" text-5xl font-bold text-blue-400">.</span>
              </span>
              <span className=" text-md text-gray-400 mb-8">
                Already A Member ?
                <span className="text-md text-blue-400">{" Log In"}</span>
              </span>
              <div className="flex flex-col gap-4 w-11/12">
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
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex w-full gap-4">
                  <ButtonComponent text="Back" />
                  <ButtonComponent text="Create account" onClick={log} />
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
