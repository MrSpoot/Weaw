import { useEffect } from "react";
import { useRoute } from "../providers/route.provider";
import backgroundImage from "../resources/background.svg";

const SplashContainer = () => {
  const { navigateTo } = useRoute();

  useEffect(() => {
    //navigateTo("login");
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden text-center">
      <img alt="background" src={backgroundImage} />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className=" text-6xl font-semibold text-[#fffff7] ">
          Weaw is under construction
        </div>
      </div>
    </div>
  );
};

export default SplashContainer;
