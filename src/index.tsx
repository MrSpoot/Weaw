import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContainer from "./containers/app.container";
import LoadingAppContainer from "./containers/loading.app.container";
import LoginContainer from "./containers/login.container";
import NotFoundContainer from "./containers/not-found.container";
import "./index.css";
import { ResponseProvider } from "./providers/response.provider";
import { RouteProviderComponent } from "./providers/route.provider";
import { WebSocketProvider } from "./providers/websocket.provider";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import VerifyAccountContainer from "./containers/verify.account.container";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProviderComponent>
        <LoadingAppContainer>
          <></>
        </LoadingAppContainer>
      </RouteProviderComponent>
    ),
  },
  {
    path: "/verify",
    element: (
      <RouteProviderComponent>
        <VerifyAccountContainer />
      </RouteProviderComponent>
    ),
  },
  {
    path: "/app",
    element: (
      <RouteProviderComponent>
        <LoadingAppContainer>
          <AppContainer />
        </LoadingAppContainer>
      </RouteProviderComponent>
    ),
  },
  {
    path: "/auth",
    element: (
      <RouteProviderComponent>
        <LoginContainer />
      </RouteProviderComponent>
    ),
  },
  {
    path: "/*",
    element: (
      <RouteProviderComponent>
        <NotFoundContainer />
      </RouteProviderComponent>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <ResponseProvider>
      <Provider store={store}>
        <WebSocketProvider>
          <div className="h-screen w-screen bg-gray-100">
            <RouterProvider router={router} />
          </div>
        </WebSocketProvider>
      </Provider>
    </ResponseProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
