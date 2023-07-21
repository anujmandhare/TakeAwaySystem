import { configureStore } from '@reduxjs/toolkit';

import user from './User';
import data from './Data';

export const store = configureStore({
    reducer: {
        user,
        data,
    },
})