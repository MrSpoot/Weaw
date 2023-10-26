import axios, { AxiosInstance } from "axios";
import React, { ReactNode } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { JsxChild } from "typescript";
import LoginContainer from "../containers/login.container";
import NotFoundContainer from "../containers/not-found.container";
import SplashContainer from "../containers/splash.container";
import { ContainerProps } from "@chakra-ui/react";

type RouteProvider = { navigateTo: (route: string) => void };

const RouteContext = React.createContext({} as RouteProvider);

export const RouteProvider = (children: ContainerProps) => {
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
