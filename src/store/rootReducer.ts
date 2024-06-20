import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import modalReducer from './modalSlice';
const rootReducer = combineReducers({
  user: userReducer,
  video:videoReducer,
  modal: modalReducer,
});

export default rootReducer;
