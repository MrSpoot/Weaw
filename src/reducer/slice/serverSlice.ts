// conversationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Server } from "../../types/server.type";

interface ServerSlice {
  servers: Server[]
}

const initialState: ServerSlice = {
    servers: []
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    addServer(state, action: PayloadAction<Server>){
        state.servers.push(action.payload)
    },
    addServers(state, action: PayloadAction<Server[]>){
      state.servers = action.payload
  }
  },
});

export const {
    addServer,
    addServers
} = serverSlice.actions;
export default serverSlice.reducer;
