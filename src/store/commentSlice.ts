import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Comments } from '@/utils/types';
const initialState: {comments: Comments[]} = {
  comments: []
}

const commentSlice = createSlice({
  name:'comment',
  initialState,
  reducers: {
    setComment: (state, action:PayloadAction<Comments[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action:PayloadAction<Comments>) => {
      const update = [...state.comments];
      update.unshift(action.payload);
      state.comments = update;
    }
  },
});

export const {setComment, addComment} = commentSlice.actions;
export default commentSlice.reducer;