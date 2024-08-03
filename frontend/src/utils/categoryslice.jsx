import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likesCategory: [],
};

const likedCategoriesSlice = createSlice({
    name: "likedCategories",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            const newCategories = action.payload.map(id => ({ categoryId: id }));
            state.likesCategory.push(...newCategories);        },
        deleteCategory: (state, action) => {
            state.likesCategory = state.likesCategory.filter(
                category => category.categoryId !== action.payload
            );
        },
        setCategories: (state, action) => {
            state.likesCategory = action.payload.map(id => ({ categoryId: id }));
        },
    },
});

export const { addCategory, deleteCategory, setCategories } = likedCategoriesSlice.actions;

export default likedCategoriesSlice.reducer;
