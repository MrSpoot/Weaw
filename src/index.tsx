import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContainer from "./containers/app.container";
import LoadingAppContainer from "./containers/loading.app.container";
import LoginContainer from "./containers/login.container";
import NotFoundContainer from "./containers/not-found.container";
import "./index.css";
import { ResponseProvider } from "./providers/response.provider";
import { RouteProvider } from "./providers/route.provider";
import { WebSocketProvider } from "./providers/websocket.provider";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

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
          <AppContainer />
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
