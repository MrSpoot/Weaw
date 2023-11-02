// conversationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isWebSocketConnected: boolean
}

const initialState: AppState = {
  isWebSocketConnected: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setWebSocketConnectionState(state, action: PayloadAction<boolean>){
      state.isWebSocketConnected = action.payload
    }
  },
});

export const {
  setWebSocketConnectionState
} = appSlice.actions;
export default appSlice.reducer;
