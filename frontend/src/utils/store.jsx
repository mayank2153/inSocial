import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice.jsx";

const Store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export default Store;