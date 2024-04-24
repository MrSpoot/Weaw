import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";

const LoginContainer: React.FC = () => {
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
                  <InputComponent placeholder="Firstname" type="text" />
                  <InputComponent placeholder="Lastname" type="text" />
                </div>
                <InputComponent placeholder="Email" type="email" />
                <InputComponent placeholder="Password" type="password" />
                <div className="flex w-full gap-4">
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
