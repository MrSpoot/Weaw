import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "../components/loader.component";
import { useRoute } from "../providers/route.provider";
import { AppDispatch } from "../reducer/slice/conversationSlice";
import { setSocial, setUser } from "../reducer/slice/userSlice";
import { fetchAndAddConversations } from "../reducer/thunk/conversation.tunk";
import conversationService from "../services/conversation.service";
import userService from "../services/user.service";
import { RootState } from "../store";
import { useWebSocket } from "../providers/websocket.provider";
import http from "../http-common";
import Cookies from "js-cookie";

const LoadingAppContainer: FunctionComponent<{ children: JSX.Element }> = ({
  children,
}) => {
  const { navigateTo } = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  const { connect } = useWebSocket();

  const dispatch = useDispatch<AppDispatch>();

  const appState = useSelector((state: RootState) => state.app);
  const userState = useSelector((state: RootState) => state.users);

  const loadData = async () => {
    const token = Cookies.get("userToken");
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const u = await userService.getUser();
      dispatch(setUser(u));

      const social = await userService.getUserSocial();
      dispatch(setSocial(social));

      const c = await conversationService.getUserConversations();
      dispatch(fetchAndAddConversations(c));

      token && connect(token);
      navigateTo("app");
    } catch (error: any) {
      navigateTo("auth");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
