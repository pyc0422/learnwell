'use client';
import {Suspense, useEffect, useState, useRef} from 'react';
import Loading from '@/components/Loading';
import CommentsSection from '@/components/CommentsSection';
import {Video} from '@/utils/types';
import { embedUrl, getYTId, isYT } from '@/utils/helpers';
import { fetchHandler } from '@/utils/fetchHandler';
import { formatDistance } from "date-fns";
import ControlBtns from '@/components/ControlBtns';

const VideoPage: React.FC<{params: {videoId: string}}> = ({params}) => {
  const {videoId} = params;
  const [video, setVideo] = useState<Video | null>(null);
  const [fullScreen, toggleFullScreen] = useState<boolean>(false)
  const divRef = useRef<HTMLDivElement>(null);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(50);
  const [player, setPlayer] = useState<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    const videoElement = divRef.current;
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

  const changePlaybackRate = (rate: number) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        event: 'command',
        func: 'setPlaybackRate',
        args: [rate]
      }, '*');
      setPlaybackRate(rate);
    }
  };

  const changeVolume = (vol: number) => {
    if (iframeRef.current) {
      console.log(iframeRef.current)
      iframeRef.current.contentWindow?.postMessage({
        event: 'command',
        func: 'setVolume',
        args: [vol]
      }, '*');
      console.log('change vol', vol)
      setVolume(vol);
    }
  };
  if (!video) return <Loading />;

  return (
    <div className='m-2 p-2 flex flex-col items-center w-full md:w-4/5 md:mx-auto pb-16'>
      <button className="bg-blue text-white my-2 py-1 w-full" onClick={() => toggleFullScreen(true)}>Watch Fullscreen</button>
      <div ref={divRef} className='w-full aspect-video card-hover hover:ring-4 rounded-lg'>
        <Suspense fallback={<p>Loading video...</p>} >
        <iframe
         ref={iframeRef}
         src={isYT(video.video_url) ? embedUrl(video.video_url) : video.video_url}
         allowFullScreen
         loading="lazy"
         className='rounded-lg w-full h-full min-h-max'
        />
        </Suspense>
        {fullScreen &&
          <ControlBtns
           fullScreen={fullScreen}
           toggleFullScreen={toggleFullScreen}
           volume={volume}
           changeVolume = {changeVolume}
           playbackRate = {playbackRate}
           changePlaybackRate = {changePlaybackRate}
          />}
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