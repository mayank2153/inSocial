import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isOpen: false,
    

  },
  reducers: {
    openChat(state, action) {
      state.isOpen = true;
      
    },
    closeChat(state) {
        state.isOpen = false;
        
    },
  },
});

export const { openChat, closeChat } = chatSlice.actions;

export default chatSlice.reducer;
