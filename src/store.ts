import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reducer/slice/appSlice';
import conversationSlice from './reducer/slice/conversationSlice';
import userSlice from './reducer/slice/userSlice';



const store = configureStore({
  reducer: {
    conversations: conversationSlice,
    users: userSlice,
    app: appSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

