
export async function GET(req:Request, {params}: {params: {videoYTId: string}}) {
  const {videoYTId} = params;
  console.log('start fetch yt api', videoYTId, process.env.NEXT_PUBLIC_YTURL);
  const apiKey = process.env.NEXT_PUBLIC_APIKEY;
  const url = `${process.env.NEXT_PUBLIC_YTURL}?id=${videoYTId}&key=${apiKey}&part=snippet`;
  console.log('fetch yt url:', url)
  const response = await fetch(url);
  const data = await response.json();
  return Response.json(data.items[0].snippet.thumbnails.default.url);

}