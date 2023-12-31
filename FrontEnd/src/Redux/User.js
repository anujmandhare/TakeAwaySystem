import { createSlice } from '@reduxjs/toolkit'

const { username, name, role, token, number } = localStorage?.user ? JSON.parse(localStorage?.user) : '';

export const user = createSlice({
    name: 'user',
    initialState: { username, loading: false, name, role, token, number },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.number = action.payload.number;
            state.role = action.payload.role;
            state.loading = false;
            state = { ...state, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state));
        },
        deleteUser: (state) => {
            state.username = "";
            state = {};
            localStorage.removeItem('user');
            localStorage.removeItem('order');
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