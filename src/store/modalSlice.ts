import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {isOpen: boolean} = {
  isOpen: false
}

const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers: {
    toggleModal: (state, action:PayloadAction<boolean>) => {
      ('in modale reducers', state, action.payload)
      state.isOpen = action.payload;
    },
  },
});

export const {toggleModal} = modalSlice.actions;
export default modalSlice.reducer;