import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";

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
