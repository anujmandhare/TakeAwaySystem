import { configureStore } from '@reduxjs/toolkit';

import user from './User';
import data from './Data';
import order from './Order';

export const store = configureStore({
    reducer: {
        user,
        data,
        order
    },
})