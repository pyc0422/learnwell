import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Comments, NewComments } from '@/utils/types';
const initialState: {comments: Comments[] | NewComments[]} = {
  comments: []
}

const commentSlice = createSlice({
  name:'comment',
  initialState,
  reducers: {
    setComment: (state, action:PayloadAction<Comments[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action:PayloadAction<NewComments>) => {
      const update = [...state.comments];
      update.push(action.payload);
      state.comments = update;
    }
  },
});

export const {setComment, addComment} = commentSlice.actions;
export default commentSlice.reducer;