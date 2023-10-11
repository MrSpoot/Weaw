import { configureStore } from '@reduxjs/toolkit';
import conversationSlice from './reducer/slice/conversationSlice';
import userSlice from './reducer/slice/userSlice';



const store = configureStore({
  reducer: {
    conversations: conversationSlice,
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

