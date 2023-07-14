import { createSlice } from '@reduxjs/toolkit'

const { username, name, role, token, number } = localStorage?.user ? JSON.parse(localStorage?.user) : '';

export const user = createSlice({
    name: 'user',
    initialState: { username, loading: false, name, role, token, number },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.number = action.payload.number;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state));
        },
        deleteUser: (state) => {
            state.username = "";
            state = {};
            localStorage.removeItem('user');
        },
        setLoadingTrue: (state) => {
            document.body.style = 'pointer-events: none;'
            state.loading = true;
        },
        setLoadingFalse: (state) => {
            document.body.style = 'pointer-events: auto;'
            state.loading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, deleteUser, setLoadingFalse, setLoadingTrue } = user.actions

export default user.reducer