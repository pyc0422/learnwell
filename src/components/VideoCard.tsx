'use client';
import { Video } from '@/utils/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { embedUrl, isYT } from '@/utils/helpers';
import { useAppDispatch } from '@/store/store';
import { toggleModal } from '@/store/modalSlice';
import { setCurVideo } from '@/store/videoSlice';
import ReactPlayer from 'react-player';

const VideoCard: React.FC<{video: Video}> = ({video}) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  //const [displayUrl, setUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   if (!isYT(video.video_url)) {
  //     setUrl(video.video_url)
  //     return;
  //   }
  //   setUrl(embedUrl(video.video_url))

  // }, [video.video_url])

  const handleCardClicked = () => {
    router.push(`/home/video/${video.id}`)
  }

  const handleEditBtnClicked = () => {
    dispatch(setCurVideo(video))
    dispatch(toggleModal(true))
  }
  return (
    <div
      className="video-card card-hover overflow-hidden max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <div className=' flex flex-col items-center justify-center w-full p-2' > */}
      <div className='relative pt-[56%] h-full w-full overflow-hidden'>
        {!video.video_url ? (
            <p>Loading...</p>
        ) :
        (
          <div className='rounded w-full aspect-[4/3] h-1/2' onClick = {handleCardClicked}>
            {/* <iframe src={displayUrl} allowFullScreen loading="lazy" className='rounded w-full h-full' width={200} height={100}/> */}
            <ReactPlayer
            url={video.video_url}
            allowFullScreen
            width='100%'
            height='auto'
            style={{overflow:'hidden', position:'absolute', top:0, left:0}}
            controls={false}
            ></ReactPlayer>
          </div>
        )}
        <div className="w-full rounded-top h-1/2 mt-1 absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-2">

          <div className=' flex justify-between items-center'>
            <h2 className="text-lg font-bold" onClick = {handleCardClicked}> {video.title}</h2>
            {isHovered && (
              <button
                className="bg-opacity-50 bg-blue px-2 rounded-md"
                onClick={handleEditBtnClicked}
              >
                Edit
              </button>
            )}
          </div>

          <div className='w-full text-wrap text-sm' onClick = {handleCardClicked}>
            {video.description.length > 70 ? `${video.description.slice(0,70)}...` : `${video.description}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;