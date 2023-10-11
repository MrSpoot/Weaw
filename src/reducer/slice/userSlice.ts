// conversationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../types/conversation.type';
import { User } from '../../types/user.type';

interface UsersState {
    actualUser: User | undefined;
    users: User[];
}

const initialState: UsersState = {
    actualUser: undefined,
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.actualUser = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
