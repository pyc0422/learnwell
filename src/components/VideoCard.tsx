'use client';
import { Video } from '@/utils/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getYTId, isYT } from '@/utils/helpers';
import CommentsSection from './CommentsSection';
const VideoCard: React.FC<{video: Video}> = ({video}) => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const fetchThumbnail = async(id:string) => {
      console.log('fetchThumbnail id:', id);
      const res = await fetch(`api/fetchYT/${id}`)
      if (res) {
        const thumbnailUrl = await res.json();
        console.log('thumbnailUrl', thumbnailUrl);
        setThumbnail(thumbnailUrl);
      }
    }
    console.log('v', video.video_url)
    if (!isYT(video.video_url)) {
      console.log('not fetch')
      setThumbnail('no')
      return;
    }
    fetchThumbnail(getYTId(video.video_url));

  }, [video.video_url])

  const handleCardClicked = () => {
    router.push(`/home/video/${video.id}`)
  }
  return (
    <div
      className="video-card card-hover"
      onClick = {handleCardClicked}
    >
      <div className=' flex flex-col items-center w-full p-2'>
        {!thumbnail ? (

            <p>Loading thumbnail...</p>

        ) : thumbnail === 'no' ?
        (
          <div className='rounded w-full aspect-[4/3]'>
            <iframe src={video.video_url} className='rounded w-full h-full' width={200} height={100}/>
          </div>
        )
        :
        (
          <Image src={thumbnail} alt={`Thumbnail of ${video.title}`} className="rounded w-full aspect-[4/3]" width={200} height={100}/>
        ) }
        <h2 className="text-lg font-bold">{video.title}</h2>
        <p className='w-full max-h-6 mb-2'>{video.description.slice(0, 60)}{video.description.length > 70 && '...'}</p>
      </div>
    </div>
  )
}

export default VideoCard;