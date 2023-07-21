import { createSlice } from '@reduxjs/toolkit'


export const data = createSlice({
    name: 'data',
    initialState: { name: '', price: '', ingredients: '' },
    reducers: {
        setMenuItem: (state, action) => {
            state.name = action.payload.name;
            state.price = action.payload.price;
            state.ingredients = action.payload.ingredients;
        },
        removeMenuItem: (state) => {
            state.name = "";
            state.price = "";
            state.ingredients = "";
        },
    },
})

export const { setMenuItem, removeMenuItem } = data.actions

export default data.reducer