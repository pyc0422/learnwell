import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleModal } from "@/store/modalSlice";
import Modal from "./Modal";
import { fetchHandler } from "@/utils/fetchHandler";
import { addVideo, clearCurVideo, setCurVideo, updateVideo } from "@/store/videoSlice";
import { getCookies, validateURL } from "@/utils/helpers";
import {  Video } from "@/utils/types";
import Swal from "sweetalert2";
const initialVideo:Video = {
  id:'',
  video_url:'',
  title:'',
  description:'',
  user_id:'',
  created_at:'',
  num_comments:0
}
const AddVideoForm: React.FC<{video?:Video}>=({video}) => {
  const [inputs, setInputs] = useState<Video>(initialVideo)
  const dispatch = useAppDispatch();
  const userId= getCookies('userId');

  useEffect(() => {
    if (video) {
      setInputs(video)
    }
  },[video])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if url validate
    if(!validateURL(inputs.video_url)) {
      Swal.fire({
        title:'Invalid Video URL',
        icon:'error'
      })
      return;
    }
    let body;
    if (video) {
      //send put request
      body = {
        video_id: inputs.id,
        title:inputs.title,
        description: inputs.description
      }
      const result = await fetchHandler('', {method:'PUT', body})
      if (result) {
        console.log('result', result)
        dispatch(updateVideo(inputs))
      }
    } else {
      body = { user_id: userId, description:inputs.description, video_url: inputs.video_url, title:inputs.title};
      console.log('add video body:', body)
      const res = await fetchHandler('', {method:'POST', body});
      if (res) {
        Swal.fire({
          title: 'Add new video successfully!',
          icon:'success'
        });
        //TODO: add the newest video to the list;
        const newVideo:Video = { ...inputs,user_id:userId, created_at:(new Date()).toDateString()};
        dispatch(addVideo(newVideo));
      }
    }
    setInputs(initialVideo)
    dispatch(clearCurVideo())
    dispatch(toggleModal(false))
  }
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({...inputs, [name]:value})
  }

  return (
    <Modal onClose={() => dispatch(toggleModal(false))}>
      <h1>{video ? 'Edit the' : 'Add a new '} video</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="input-wrap">
          <label htmlFor="title">title</label>
          <input
            name="title"
            type="text"
            value={inputs.title}
            onChange={handleOnChange}
            required />
        </div>
        <div className="input-wrap">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={inputs.description}
            className="border rounded shadow-md h-16"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="video_url">Url</label>
          <input
           name="video_url"
           value={inputs.video_url}
           readOnly={!!video}
           type="text"
           onChange={handleOnChange}
           className={!video ? '' : 'bg-gray-200 cursor-not-allowed'}
           />
        </div>
        <button type="submit" className="my-4 green-btn">{video ? 'Edit' :'Add'}</button>

      </form>
    </Modal>
  )
}
export default AddVideoForm;