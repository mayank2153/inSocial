import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearPosts: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setPosts, setLoading, setError, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
