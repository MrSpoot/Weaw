import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducer/slice/appSlice";
import callSlice from "./reducer/slice/callSlice.ts";
import conversationSlice from "./reducer/slice/conversationSlice";
import serverSlice from "./reducer/slice/serverSlice";
import userSlice from "./reducer/slice/userSlice";

const store = configureStore({
  reducer: {
    conversations: conversationSlice,
    users: userSlice,
    app: appSlice,
    call: callSlice,
    server: serverSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
