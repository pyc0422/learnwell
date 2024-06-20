import { fetchHandler } from "@/utils/fetchHandler";

export const dynamic = 'force-dynamic';
export async function GET(req:Request, {params}: {params: {videoId: string}}) {
  const {videoId} = params;
  try {
    const video = await fetchHandler(`/single?video_id=${videoId}`, {});
    return Response.json(video);
  } catch(error) {
    console.error('Error fetching all videos: ', error);
    return Response.error()
  }
}