import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppContainer from "./containers/app.container";
import CallContainer from "./containers/call.container";
import ChannelListContainer from "./containers/channel.list.container";
import ConversationContainer from "./containers/conversation.container";
import ConversationListContainer from "./containers/conversation.list.container";
import FriendsContainer from "./containers/friends.container";
import LoadingAppContainer from "./containers/loading.app.container";
import LoginContainer from "./containers/login.container";
import NotFoundContainer from "./containers/not-found.container";
import VerifyAccountContainer from "./containers/verify.account.container";
import "./index.css";
import { CallProviderComponent } from "./providers/call.provider";
import { ResponseProvider } from "./providers/response.provider";
import { RouteProviderComponent } from "./providers/route.provider";
import { WebSocketProvider } from "./providers/websocket.provider";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { theme } from "./theme";

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
          <AppContainer
            leftChildren={<ConversationListContainer />}
            children={<FriendsContainer />}
          />
        </LoadingAppContainer>
      </RouteProviderComponent>
    ),
  },
  {
    path: "/app/channel/:conversationId",
    element: (
      <RouteProviderComponent>
        <LoadingAppContainer>
          <AppContainer
            leftChildren={<ConversationListContainer />}
            children={<ConversationContainer />}
          />
        </LoadingAppContainer>
      </RouteProviderComponent>
    ),
  },
  {
    path: "/app/channel/:conversationId/call",
    element: (
      <RouteProviderComponent>
        <LoadingAppContainer>
          <AppContainer leftChildren={<></>} children={<CallContainer />} />
        </LoadingAppContainer>
      </RouteProviderComponent>
    ),
  },
  {
    path: "/app/server/:serverId/channel/:conversationId",
    element: (
      <RouteProviderComponent>
        <LoadingAppContainer>
          <AppContainer
            leftChildren={<ChannelListContainer />}
            children={<ConversationContainer />}
          />
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
  <ChakraProvider theme={theme}>
    <ResponseProvider>
      <Provider store={store}>
        <WebSocketProvider>
          <CallProviderComponent>
            <RouterProvider router={router} />
          </CallProviderComponent>
        </WebSocketProvider>
      </Provider>
    </ResponseProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
