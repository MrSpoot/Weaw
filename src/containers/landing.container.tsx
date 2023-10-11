import { useEffect } from "react";
import { useRoute } from "../providers/route.provider";
import group6 from "../resources/Group 6.svg";
import group12 from "../resources/Group 12.svg";
import group15 from "../resources/Group 15.svg";
import group28 from "../resources/Group 28.svg";
import SimpleBar from "simplebar-react";

const LandingContainer = () => {
  const { navigateTo } = useRoute();

  useEffect(() => {
    navigateTo("auth");
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <div className="App">
        <h1>SimpleBar React</h1>
        <SimpleBar style={{ maxHeight: 300 }}>
          {[...Array(50)].map((x, i) => (
            <p>{i}</p>
          ))}
        </SimpleBar>
      </div>
    </div>
  );
};

export default LandingContainer;
