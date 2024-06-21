import { useEffect, useState } from "react"
import { fetchHandler } from "@/utils/fetchHandler"
import { Comments } from "@/utils/types"
import AddCommentForm from './AddCommentForm';
import Loading from "./Loading"
import { formatDistance } from "date-fns";
const CommentsSection: React.FC<{videoId?:string,commentsNum: number}> = ({
  videoId, commentsNum}) => {
  const [comments, setComments] = useState<Comments[] | null>(null)

  useEffect(() => {
    const getComments = async () => {
      const res = await fetchHandler(`/comments?video_id=${videoId}`)
      if (res) {
        setComments(res.comments);
      }
    }
    getComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!videoId) return;
  return (
    <div className="flex flex-col gap-3">
      <h3>{commentsNum > 0 ? `${commentsNum} Comments` : 'No Comments yet'}</h3>
      <AddCommentForm video_id={videoId}/>
      <div className="flex flex-col divide-y">
      {!comments ? <Loading /> :
      comments.map((comment, i) =>
        <div key={`${comment.video_id}-${i+1}`} className="flex flex-col justify-start items-start py-2">
          <div className="flex gap-3 justify-start items-center">
            <b>@{comment.user_id}</b>
            <div>{formatDistance(new Date(comment.created_at), new Date())}</div>
          </div>
          <p>{comment.content}</p>
        </div>
      )
      }

      </div>
    </div>
  )
}

export default CommentsSection;