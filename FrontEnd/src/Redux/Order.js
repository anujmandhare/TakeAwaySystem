import { createSlice } from '@reduxjs/toolkit'


const init = localStorage?.order ? JSON.parse(localStorage?.order) : [];

export const order = createSlice({
    name: 'order',
    initialState: init,
    reducers: {
        addToOrder: (state, action) => {
            const index = state.findIndex(_ => _.name === action.payload.name);
            if (index === -1) {
                state.push(action.payload);
            } else {
                state[index].price = Number(state[index].price) + Number(action.payload.price);
            }
            localStorage.setItem('order', JSON.stringify(state));
        },
        removeFromOrder: (state, action) => {
            state.length = 0;
            action.payload.forEach(element => {
                state.push(element);
            });
            localStorage.setItem('order', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.length = 0;
            localStorage.setItem('order', JSON.stringify(state));
        }
    },
})

export const { addToOrder, removeFromOrder, clearCart } = order.actions

export default order.reducer