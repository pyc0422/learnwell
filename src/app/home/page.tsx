'use client';
import { useEffect } from "react";
import VideoCard from '@/components/VideoCard';
import Loading from '@/components/Loading';
import {Video} from '@/utils/types';
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setVideos } from '@/store/videoSlice';

import { getCookies } from "@/utils/helpers";
const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const userId = getCookies('userId');
  const [first,last] = userId ? userId.split('-') : [];
  const videos= useAppSelector(state => state.video.videos);
  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(`/api/videos`);
      if (res) {
        const {videos}:{videos: Video[]} = await res.json();
        console.log('videos', videos.length, videos)
        dispatch(setVideos(videos))
      }
    }
    fetchVideos();

  },[]);

  return (
    <div className="md:w-[80%] md:mx-auto">
      <h1>
        Welcome <span className="text-green capitalize">{first} {last}</span> !</h1>
      <div className="flex flex-wrap w-full justify-flex-start gap-5">
      {videos === null ? <Loading /> :
       (videos.length === 0 ? <h1>No video yet, upload first</h1>
          : videos.map(video => <VideoCard key={video.id} video={video} />))}
      </div>
    </div>
  )
}

export default Home;