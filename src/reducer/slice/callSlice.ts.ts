// conversationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebRTCMessage } from "../../types/websocket.type";
import { Conversation } from "../../types/conversation.type";

type callDirection = "RECEIVER" | "EMITTER";

interface CallState {
  conversation: Conversation | undefined;
  isCalling: boolean;
  direction: callDirection;
  webRTCInfo: WebRTCMessage | undefined;
}

const initialState: CallState = {
  conversation: undefined,
  isCalling: false,
  direction: "RECEIVER",
  webRTCInfo: undefined,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setCall(state, action: PayloadAction<CallState>) {
      state.conversation = action.payload.conversation;
      state.direction = action.payload.direction;
      state.isCalling = action.payload.isCalling;
      state.webRTCInfo = action.payload.webRTCInfo;
    },
  },
});

export const { setCall } = callSlice.actions;
export default callSlice.reducer;
