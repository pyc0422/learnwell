'use client';
import {Suspense, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/components/Loading';
import FullScreenPlayer from '@/components/FullScreenPlayer';
import CommentsSection from '@/components/CommentsSection';
import {Video} from '@/utils/types';
import { getYTId } from '@/utils/helpers';
import { fetchHandler } from '@/utils/fetchHandler';
import { formatDistance } from "date-fns";
const VideoPage: React.FC<{params: {videoId: string}}> = ({params}) => {
  const {videoId} = params;
  const [video, setVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() =>{
    async function fetchVideo() {
      const res = await fetchHandler(`/single?video_id=${videoId}`)
      if (res) {
        console.log(res);
        setVideo(res.video);
      }
    }
    fetchVideo()
  }, [videoId])

  if (!video) return <Loading />;

  const embedUrl = () => {
    const id = getYTId(video.video_url);
    return `https://www.youtube.com/embed/${id}`
  }

  return (
    <div className='m-2 p-2 flex flex-col items-center h-screen w-full md:w-4/5 md:mx-auto pb-16'>
      <div className='md:w-full md:h-full'>
      <Suspense fallback={<p>Loading video...</p>} >
      <iframe src={embedUrl()} allowFullScreen className='rounded-lg w-full h-full min-h-max'/>
      </Suspense>
      </div>
      <div className='flex justify-start flex-col w-full'>
        <h2>{video.title}</h2>
        <div className='flex gap-3 md:gap-5 items-center'>
          <h3>{video.user_id}</h3>
          <p>Uploaded {formatDistance(new Date(video.created_at), new Date())} ago</p>
        </div>
        <div className='bg-gray-200 rounded bg-opacity-50 border my-1 md:my-2 p-2'>
          <p className='py-1 md:py-2'>{video.description}</p>
        </div>
        <button className="bg-blue text-white my-2 py-1" onClick={() => router.push(`/fullscreen/${videoId}`)}>Watch Fullscreen</button>
      {/* <FullScreenPlayer url={video.video_url} /> */}
        <div className='h-2 border-b-2 my-4' />
      <CommentsSection videoId={videoId} commentsNum={video.num_comments}/>
      </div>
    </div>
  )
}

export default VideoPage;