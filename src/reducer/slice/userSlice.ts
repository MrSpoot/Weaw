// conversationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../types/conversation.type';
import { User } from '../../types/user.type';
import { Social } from '../../types/social.type';

interface UsersState {
    actualUser: User | undefined;
    users: User[];
    social: Social | undefined;
}

const initialState: UsersState = {
    actualUser: undefined,
    users: [],
    social: undefined
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.actualUser = action.payload;
        },
        setSocial(state, action: PayloadAction<Social>){
            state.social = action.payload;
        }
    }
});

export const { setUser, setSocial } = userSlice.actions;
export default userSlice.reducer;
