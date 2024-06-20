'use client';
import {Suspense, useEffect, useState, useRef} from 'react';
import Loading from '@/components/Loading';
import CommentsSection from '@/components/CommentsSection';
import {Video} from '@/utils/types';
import { getYTId, isYT } from '@/utils/helpers';
import { fetchHandler } from '@/utils/fetchHandler';
import { formatDistance } from "date-fns";

const VideoPage: React.FC<{params: {videoId: string}}> = ({params}) => {
  const {videoId} = params;
  const [video, setVideo] = useState<Video | null>(null);
  const [fullScreen, toggleFullScreen] = useState<boolean>(false)
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    async function fetchVideo() {
      const res = await fetchHandler(`/single?video_id=${videoId}`)
      if (res) {
        setVideo(res.video);
      }
    }
    fetchVideo()
  }, [videoId])

  const handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      toggleFullScreen(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return
    if (fullScreen) {
      videoElement.requestFullscreen().catch(() => toggleFullScreen(false));
    } else {
      document.exitFullscreen().catch(() => {});
    }
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }
  }, [fullScreen])

  if (!video) return <Loading />;

  const embedUrl = () => {
    return isYT(video.video_url) ?
    `https://www.youtube.com/embed/${getYTId(video.video_url)}`
    : video.video_url
  }

  return (
    <div className='m-2 p-2 flex flex-col items-center w-full md:w-4/5 md:mx-auto pb-16'>
      <button className="bg-blue text-white my-2 py-1 w-full" onClick={() => toggleFullScreen(true)}>Watch Fullscreen</button>
      <div ref={videoRef} className='w-full aspect-video card-hover hover:ring-4 rounded-lg'>
        <Suspense fallback={<p>Loading video...</p>} >
        <iframe src={embedUrl()} allowFullScreen className='rounded-lg w-full h-full min-h-max'/>
        </Suspense>
      </div>
      <div className='flex grow-0 justify-start flex-col w-full'>
        <h2>{video.title}</h2>
        <div className='flex gap-3 md:gap-5 items-center'>
          <h3>{video.user_id}</h3>
          <p>Uploaded {formatDistance(new Date(video.created_at), new Date())} ago</p>
        </div>
        <div className='bg-gray-200 rounded bg-opacity-50 border my-1 md:my-2 p-2'>
          <p className='py-1 md:py-2'>{video.description}</p>
        </div>


      <div className='h-2 border-b-2 my-4' />
      <CommentsSection videoId={videoId} commentsNum={video.num_comments}/>
      </div>
    </div>
  )
}

export default VideoPage;