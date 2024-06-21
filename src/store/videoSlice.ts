import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { NewVideo, Video } from '@/utils/types';

type CurrentType = Video & {YTid?:string}
interface VideoState {
  videos:Video[] | null,
  curVideo?: Video | null
}

const initialState: VideoState = {
  videos:[],
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
    updateVideo:(state, action:PayloadAction<Video>) => {
      let updateVideos = state.videos ? [...state.videos] : [];
      updateVideos.map(v => v.id === action.payload.id ? action.payload : v);
      state.videos = updateVideos;
    },
    setCurVideo: (state, action: PayloadAction<Video>) => {
      state.curVideo = action.payload;
    }
  },
});

export const {setVideos, addVideo, updateVideo, setCurVideo} = videoSlice.actions;
export default videoSlice.reducer;