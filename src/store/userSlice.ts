import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {userId: string | null} = {
  userId: null
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    setUserId: (state, action:PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const {setUserId} = userSlice.actions;
export default userSlice.reducer;