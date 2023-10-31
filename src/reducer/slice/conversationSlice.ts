import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../../store";
import { Conversation } from "../../types/conversation.type";
import { Message } from "../../types/message.type";
import {
  fetchAndAddConversation,
  fetchAndAddConversations,
  loadMoreMessages,
} from "../thunk/conversation.tunk";

interface ConversationsState {
  conversation: Conversation;
  messages: Message[];
  currentPage: number;
  totalPages: number;
  totalMessagesCount: number;
  isLoading: boolean;
  hasMoreItems: boolean;
}

const initialState: ConversationsState[] = [];

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addNewMessage(state, action: PayloadAction<Message>) {
      const conversationState = state.find(
        (c) => c.conversation.id === action.payload.conversationId
      );
      conversationState && conversationState.messages.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAndAddConversation.fulfilled, (state, action) => {
      const { conversation, messagesData } = action.payload;
      state.push({
        conversation,
        messages: messagesData.messages,
        currentPage: 1,
        totalPages: messagesData.totalPages,
        totalMessagesCount: messagesData.totalMessagesCount,
        isLoading: false,
        hasMoreItems: messagesData.totalPages > 1,
      });
    });

    builder.addCase(fetchAndAddConversations.fulfilled, (state, action) => {
      action.payload.forEach((item) => {
        state.push({
          conversation: item.conversation,
          messages: item.messagesData.messages,
          currentPage: 1,
          totalPages: item.messagesData.totalPages,
          totalMessagesCount: item.messagesData.totalMessagesCount,
          isLoading: false,
          hasMoreItems: item.messagesData.totalPages > 1,
        });
      });
    });

    builder.addCase(loadMoreMessages.fulfilled, (state, action) => {
      const conversationState = state.find(
        (c) => c.conversation.id === action.meta.arg
      );
      if (conversationState) {
        conversationState.messages.push(...action.payload.messages);
        conversationState.totalPages = action.payload.totalPages;
        conversationState.hasMoreItems =
          action.payload.totalPages > action.payload.currentPage;
        conversationState.currentPage = action.payload.currentPage;
      }
    });
  },
});

export const { addNewMessage } = conversationsSlice.actions;
export default conversationsSlice.reducer;
export type AppDispatch = typeof store.dispatch;
