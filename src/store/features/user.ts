import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: { token: localStorage.getItem('token') || '' },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        deleteToken: (state) => {
            state.token = '';
            localStorage.removeItem('token');
        }
    }
});
export const { setToken,deleteToken } = userSlice.actions;
export default userSlice.reducer;
