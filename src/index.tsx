import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundContainer from "./containers/not-found.container";
import SplashContainer from "./containers/splash.container";
import { RouteProvider } from "./providers/route.provider";
import { Provider } from "react-redux";
import store from "./store";
import LoadingAppContainer from "./containers/loading.app.container";
import { ChakraProvider } from "@chakra-ui/react";
import LoginContainer from "./containers/login.container";
import { ResponseProvider } from "./providers/ResponseProvider";
import TestContainer from "./containers/test.container";
import AppContainer from "./containers/app.container";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProvider>
        <LoadingAppContainer>
          <></>
        </LoadingAppContainer>
      </RouteProvider>
    ),
  },
  {
    path: "/test",
    element: (
      <RouteProvider>
        <AppContainer />
      </RouteProvider>
    ),
  },
  {
    path: "/app",
    element: (
      <RouteProvider>
        <LoadingAppContainer>
          <></>
        </LoadingAppContainer>
      </RouteProvider>
    ),
  },
  {
    path: "/auth",
    element: (
      <RouteProvider>
        <LoginContainer />
      </RouteProvider>
    ),
  },
  {
    path: "/*",
    element: (
      <RouteProvider>
        <NotFoundContainer />
      </RouteProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <ResponseProvider>
      <Provider store={store}>
        <div className="h-screen w-screen bg-gray-100">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </ResponseProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
