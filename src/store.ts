import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducer/slice/appSlice";
import conversationSlice from "./reducer/slice/conversationSlice";
import userSlice from "./reducer/slice/userSlice";
import callSlice from "./reducer/slice/callSlice.ts";

const store = configureStore({
  reducer: {
    conversations: conversationSlice,
    users: userSlice,
    app: appSlice,
    call: callSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
