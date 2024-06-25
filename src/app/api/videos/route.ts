import { fetchHandler } from "@/utils/fetchHandler";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const cookies = req.cookies;
  const userId = cookies.get('userId');
  try {
    const video = await fetchHandler(`?user_id=${userId?.value}`);
    console.log('v', video.videos.length);
    return Response.json(video);
  } catch(error) {
    console.error('Error fetching all videos: ', error);
    return Response.error()
  }
}

// export async function POST(req:NextRequest, res: Response) {
//   try {
//     const video = await fetchHandler('', {method:'POST'})
//   }
// }