// conversationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Social, SocialRequest } from "../../types/social.type";
import { User } from "../../types/user.type";
import { WebSocketFriendRequestResponsePayload } from "../../types/websocket.type";

interface UsersState {
  actualUser: User | undefined;
  users: User[];
  social: Social | undefined;
}

const initialState: UsersState = {
  actualUser: undefined,
  users: [],
  social: undefined,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.actualUser = action.payload;
    },
    setSocial(state, action: PayloadAction<Social>) {
      state.social = action.payload;
    },
    addSocialRequest(state, action: PayloadAction<SocialRequest>) {
      state.social?.socialRequests.push(action.payload);
    },
    processSocialRequestResponse(
      state,
      action: PayloadAction<WebSocketFriendRequestResponsePayload>
    ) {
      const socialRequest = state.social?.socialRequests.find(
        (sr) => sr.id === action.payload.socialRequestId
      );
      if (state.social && socialRequest) {
        state.social.socialRequests = state.social.socialRequests.filter(
          (sr) => sr.id !== action.payload.socialRequestId
        );
        if (action.payload.response === "ACCEPTED") {
          if (socialRequest.requestDirection === "EMITTER") {
            state.social.friends.push(socialRequest.receiver);
          } else {
            state.social.friends.push(socialRequest.sender);
          }
        }
      }
    },
  },
});

export const {
  setUser,
  setSocial,
  addSocialRequest,
  processSocialRequestResponse,
} = userSlice.actions;
export default userSlice.reducer;
