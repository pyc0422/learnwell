import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Video } from '@/utils/types';

type CurrentType = Video & {YTid?:string}
interface VideoState {
  videos:Video[] | null,
  current: CurrentType | null
}

const initialState: VideoState = {
  videos:[],
  current:null
}

const videoSlice = createSlice({
  name:'video',
  initialState,
  reducers: {
    setVideos:(state, action: PayloadAction<Video[]>)=> {
      state.videos = action.payload;
    },
    addVideo:(state, action:PayloadAction<Video>) => {
      let updateState = state.videos ? [...state.videos] : [];
      updateState.push(action.payload);
      state.videos = updateState;
    },
    setCurrent:(state, action:PayloadAction<CurrentType | null>) => {
      state.current = action.payload;
    }
  },
});

export const {setVideos, addVideo, setCurrent} = videoSlice.actions;
export default videoSlice.reducer;