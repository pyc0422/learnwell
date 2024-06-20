import { fetchHandler } from "@/utils/fetchHandler";
import { Comments } from "@/utils/types";
import { useState, useEffect } from "react";
import { getCookies } from "@/utils/helpers";
const AddCommentForm:React.FC<{video_id:string}> = ({video_id}) => {
  const [content, setContent] = useState<string>('');
  const [hiddenBtn, toggleBtn] = useState<boolean>(true);
  const user_id = getCookies('userId');

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchHandler(`/comments`,
      {
        method:'POST',
        body:{
          video_id,
          content,
          user_id
        }
      })
    if (res) {
      alert(`add new comments! ${res.sucess}`)
      setContent('')
    }
  }

  useEffect(() => {
    if (content.length < 1) {
      toggleBtn(true);
    }
  },[content])
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center w-full" onReset={() => setContent('')}>

        <div className="min-w-max capitalize font-semibold">{user_id}</div>

      <div className="w-full">
        <input
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Add a comment..."
          onClick={() => toggleBtn(false)}
          onBlur={() => toggleBtn(content.length > 0 ? false : true)}
          className="pb-0 font-light border-x-0 border-t-0 rounded-none shadow-none border-b-2 w-full focus:border-b-black focus:outline-none my-2 focus:ring-0"
        />
        <div className={`w-full text-right gap-3 justify-end ${hiddenBtn ? "hidden" : 'flex'}`}>
          <button
            className="px-4 py-1 border-0 rounded-full hover:bg-gray-300"
            type="reset"
          >Cancel</button>
          <button
            className="px-4 py-1 rounded-full disabled:opacity-25"
            disabled={content.length > 0 ? false:true}
            type="submit"
          >Comment</button>
        </div>
      </div>
    </form>
  )
}

export default AddCommentForm;