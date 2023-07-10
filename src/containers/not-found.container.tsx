import { useEffect } from "react";
import { useRoute } from "../providers/route.provider";

const NotFoundContainer = () => {
  const { navigateTo } = useRoute();

  useEffect(() => {
    navigateTo("");
  }, []);

  return <p>404 Not Found</p>;
};

export default NotFoundContainer;
