import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import messageService from '../../services/message.service';
import { Conversation } from '../../types/conversation.type';

export const loadMoreMessages = createAsyncThunk(
    'conversations/loadMoreMessages',
    async (conversationId: string, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const conversationState = state.conversations.find(c => c.conversation.id === conversationId);
        if (!conversationState) {
            return thunkAPI.rejectWithValue('Conversation not found');
        }

        const pageToSearch = conversationState.currentPage + 1;
        const m = await messageService.getConversationMessages(conversationId, pageToSearch);
        
        return {
            messages: m.messages,
            totalPages: m.totalPages,
            currentPage: pageToSearch
        };
    }
);

export const fetchAndAddConversation = createAsyncThunk(
    'conversations/fetchAndAddConversation',
    async (conversation: Conversation) => {
        const messagesData = await messageService.getConversationMessages(conversation.id, 1);
        return { conversation, messagesData };
    }
);

export const fetchAndAddConversations = createAsyncThunk(
    'conversations/fetchAndAddConversations',
    async (conversations: Conversation[]) => {
        const results = [];
        for (const conversation of conversations) {
            const messagesData = await messageService.getConversationMessages(conversation.id, 1);
            results.push({ conversation: conversation, messagesData: messagesData });
        }
        return results;
    }
);
