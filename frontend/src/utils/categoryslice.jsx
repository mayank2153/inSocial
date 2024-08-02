import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likesCategory: [],
};

const likedCategoriesSlice = createSlice({
    name: "likedCategories",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.likesCategory.push({ categoryId: action.payload });
        },
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
