import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice.jsx";
import postsReducer from "./postsSlice.jsx"
const Store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
});

export default Store;