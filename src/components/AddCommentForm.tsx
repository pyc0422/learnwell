import { fetchHandler } from "@/utils/fetchHandler";
import { useState, useEffect } from "react";

const restyledInput:string= 'dark:bg-dark-bg pb-0 font-light border-x-0 border-t-0 rounded-none shadow-none border-b-2 focus:border-b-black dark:focus:border-b-white focus:outline-none my-2 focus:ring-0'
const AddCommentForm:React.FC<{video_id:string}> = ({video_id}) => {
  const [content, setContent] = useState<string>('');
  const [commenter, setCommenter] = useState<string>('')
  const [hiddenBtn, toggleBtn] = useState<boolean>(true);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchHandler(`/comments`,
      {
        method:'POST',
        body:{
          video_id,
          content,
          user_id:commenter
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
    <form
      onSubmit={handleSubmit}
      onReset={() => {setCommenter('');setContent('')}}
      className="flex flex-col gap-3 items-start w-full"
    >
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="username">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
          </svg>
        </label>
        <input
          type="text"
          name="username"
          required
          value={commenter}
          maxLength={20}
          placeholder="Your Name"
          onChange={(e) => setCommenter(e.target.value)}
          className={`${restyledInput} min-w-max capitalize font-semibold`}
        />
      </div>

      <div className="w-full">
        <input
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          minLength={10}
          maxLength={200}
          placeholder="Add a comment..."
          onClick={() => toggleBtn(false)}
          onBlur={() => toggleBtn(content.length > 0 ? false : true)}
          className={`${restyledInput} w-full`}
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