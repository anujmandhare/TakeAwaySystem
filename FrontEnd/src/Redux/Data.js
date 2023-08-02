import { createSlice } from '@reduxjs/toolkit'


export const data = createSlice({
    name: 'data',
    initialState: { name: '', price: '', ingredients: '', _id: '' },
    reducers: {
        setMenuItem: (state, action) => {
            state.name = action.payload.name;
            state.price = action.payload.price;
            state.ingredients = action.payload.ingredients;
            state._id = action.payload._id;
        },
        removeMenuItem: (state) => {
            state.name = "";
            state.price = "";
            state.ingredients = "";
            state._id = "";
        },
    },
})

export const { setMenuItem, removeMenuItem } = data.actions

export default data.reducer