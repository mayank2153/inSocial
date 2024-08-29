import { createSlice } from "@reduxjs/toolkit";
const initialState= {
    comments:[]
}
const commentsSlice=createSlice(
    {
        name:"comments",
        initialState,
    
        reducers:{
            setComments:    (state,action)=>{
                state.comments=action.payload
            },
            addComment:     (state,action)=>{
                state.comments.push(action.payload)
            }
        }
}
)
export const {
    setComments,
    addComment
}=commentsSlice.actions
export default commentsSlice.reducer