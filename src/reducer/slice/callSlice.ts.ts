// conversationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type callDirection = "RECEIVER" | "EMITTER";

interface CallState {
  calling: boolean;
  direction: callDirection;
}

const initialState: CallState = {
  calling: false,
  direction: "RECEIVER",
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setCall(state, action: PayloadAction<boolean>) {
      state.calling = action.payload;
    },
  },
});

export const { setCall } = callSlice.actions;
export default callSlice.reducer;
