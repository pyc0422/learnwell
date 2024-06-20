'use client';
import { useEffect, useState } from "react";
import VideoCard from '@/components/VideoCard';
import Loading from '@/components/Loading';
import {Video} from '@/utils/types';
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setVideos } from '@/store/videoSlice';
import { setUserId } from "@/store/userSlice";
import AddVideoForm from '@/components/AddVideoForm';
import { getCookies } from "@/utils/helpers";
const Home: React.FC = () => {
  const [user, setUser] = useState<string>('')
  const dispatch = useAppDispatch()
  const userFromStore = useAppSelector(state => state.user.userId);
  const isOpen = useAppSelector(state => state.modal.isOpen);

  const [videos, setVideos] = useState<Video[] | null>(null);
  useEffect(() => {
    /*
      redux stored userId are from login page
      if we directly visit from home page the userId will be empty
      so we need to double check if the cookies contains userid
    */
    if (!userFromStore) {
      const userId = getCookies('userId');
      if (userId) {
        dispatch(setUserId(userId));
        setUser(userId)
      }
    } else {
      setUser(userFromStore);
    }
    async function fetchVideos() {
      const res = await fetch(`/api/videos`);
      if (res) {
        const {videos}:{videos: Video[]} = await res.json();
        console.log('v', videos)
        dispatch(() => setVideos(videos))
        setVideos(videos);
      }
    }
    fetchVideos();
  },[]);
  let first, last;
  if (user) {
    [first,last] = user.split('-');
  }
  return (
    <div className="md:w-[80%] md:mx-auto">
      <h1 className="capitalize">
        Welcome <span className="text-green">{first} {last}</span> !</h1>
      <div className="flex flex-wrap w-full justify-flex-start gap-5">
      {videos === null ? <Loading /> :
       (videos.length === 0 ? <h1>No video yet, upload first</h1>
          : videos.map(video => <VideoCard key={video.id} video={video} />))}
      </div>
      {isOpen &&
        <AddVideoForm />
      }
    </div>
  )
}

export default Home;