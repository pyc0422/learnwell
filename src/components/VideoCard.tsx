'use client';
import { Video } from '@/utils/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getYTId } from '@/utils/helpers';
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
    fetchThumbnail(getYTId(video.video_url));

  }, [video.video_url])

  const handleCardClicked = () => {
    router.push(`/video/${video.id}`)
  }
  return (
    <div
      className="video-card p-4 bg-white shadow-lg rounded-lg flex flex-col items-center"
      onClick = {handleCardClicked}
    >

      {thumbnail ? (
        <Image src={thumbnail} alt={`Thumbnail of ${video.title}`} className="rounded h-auto" width={200} height={100}/>
      ) : (
        <div className="w-full h-56 bg-gray-300 flex items-center justify-center">
          <p>Loading thumbnail...</p>
        </div>
      )}
      <h2 className="text-lg font-bold mb-2">{video.title}</h2>
    </div>
  )
}

export default VideoCard;