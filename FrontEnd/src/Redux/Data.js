import { createSlice } from '@reduxjs/toolkit'


export const data = createSlice({
    name: 'data',
    initialState: {},
    reducers: {
        setMenuItem: (state, action) => {
            state = { ...state, ...action.payload };
        },
        removeMenuItem: (state) => {
            state.username = "";
            state = {};
            localStorage.removeItem('user');
        },
    },
})

export const { setMenuItem, removeMenuItem } = data.actions

export default data.reducer