import axios, { AxiosInstance } from "axios";
import React, { ReactNode } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { JsxChild } from "typescript";
import LoginContainer from "../containers/login.container";
import NotFoundContainer from "../containers/not-found.container";
import SplashContainer from "../containers/splash.container";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

type ContainerProps = {
  children: React.ReactNode;
};

type ResponseProvider = { handleResponse: (response: Response) => void };

const ResponseContext = React.createContext({} as ResponseProvider);

export const ResponseProvider = (children: ContainerProps) => {
  const value: ResponseProvider = {
    handleResponse: (response: Response) => {
      if (response.status >= 200 && response.status < 300) {
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your application has been received. We will review your
              application and respond within the next 48 hours.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
          />
        </Alert>;
      } else {
        // Gérez les erreurs
        // toast.error("Une erreur s'est produite.");
      }
    },
  };

  return (
    <ResponseContext.Provider value={value}>
      {children.children}
    </ResponseContext.Provider>
  );
};

export const useResponse = () => React.useContext(ResponseContext);
