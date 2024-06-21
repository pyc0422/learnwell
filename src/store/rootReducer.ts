import { combineReducers } from '@reduxjs/toolkit';
import commentReducer from './commentSlice';
import videoReducer from './videoSlice';
import modalReducer from './modalSlice';
const rootReducer = combineReducers({
  comment: commentReducer,
  video:videoReducer,
  modal: modalReducer,
});

export default rootReducer;
