import { ContainerProps } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

type RouteProvider = { navigateTo: (route: string) => void };

const RouteContext = React.createContext({} as RouteProvider);

export const RouteProviderComponent = (children: ContainerProps) => {
  const navigate = useNavigate();

  const value: RouteProvider = {
    navigateTo: (route: string) => {
      navigate("/" + route);
    },
  };

  return (
    <RouteContext.Provider value={value}>
      {children.children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => React.useContext(RouteContext);
