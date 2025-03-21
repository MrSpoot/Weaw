import Cookies from "js-cookie";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LoaderComponent from "../components/loader.component";
import http from "../http-common";
import { useRoute } from "../providers/route.provider";
import { useWebSocket } from "../providers/websocket.provider";
import { AppDispatch } from "../reducer/slice/conversationSlice";
import { addServers } from "../reducer/slice/serverSlice";
import { setSocial, setUser } from "../reducer/slice/userSlice";
import { fetchAndAddConversations } from "../reducer/thunk/conversation.tunk";
import conversationService from "../services/conversation.service";
import serverService from "../services/server.service";
import userService from "../services/user.service";
import { RootState } from "../store";

const LoadingAppContainer: FunctionComponent<{ children: JSX.Element }> = ({
  children,
}) => {
  const { navigateTo } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const { connect } = useWebSocket();

  const dispatch = useDispatch<AppDispatch>();

  const appState = useSelector((state: RootState) => state.app);
  const userState = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const promises: Promise<any>[] = [];

    promises.push(
      userService.getUser().then((u) => {
        dispatch(setUser(u));
      })
    );
    promises.push(
      conversationService.getUserConversations().then((c) => {
        dispatch(fetchAndAddConversations(c));
      })
    );
    promises.push(
      userService.getUserSocial().then((s) => {
        dispatch(setSocial(s));
      })
    );
    promises.push(
      serverService.getUserServers().then((servers) => {
        servers.forEach((serv) => {
          dispatch(fetchAndAddConversations(serv.conversations));
        });
        dispatch(addServers(servers));
      })
    );

    Promise.all(promises)
      .then(() => {
        setIsLoading(false);
        token && connect(token);
        if (location.pathname === "/") {
          navigateTo("app");
        } else {
          navigateTo(location.pathname.slice(1));
        }
      })
      .catch(() => {
        navigateTo("auth");
        setIsLoading(false);
      });
  }, []);

  return isLoading ||
    !!!appState.isWebSocketConnected ||
    !!!userState.actualUser ? (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderComponent />
    </div>
  ) : (
    children
  );
};

export default LoadingAppContainer;
