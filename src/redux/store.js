import { configureStore } from '@reduxjs/toolkit';
import trade from "./dataSlice"

export const store = configureStore({
    reducer: {
        trade
    },
});