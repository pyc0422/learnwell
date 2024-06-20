import { useAppDispatch } from "@/store/store";
import { toggleModal } from "@/store/modalSlice";
import Modal from "./Modal";
import { fetchHandler } from "@/utils/fetchHandler";
import { addVideo } from "@/store/videoSlice";
import { getCookies, validateURL } from "@/utils/helpers";

const AddVideoForm: React.FC=() => {
  const dispatch = useAppDispatch();
  const userId= getCookies('userId');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formValues= Object.fromEntries(new FormData(form).entries());
    // send the form values to API
    if(!validateURL(formValues.video_url)) {
      alert('video url not right');
      return;
    }
    const body = {user_id: userId, ...formValues};
    try {
      const res = await fetchHandler('', {method:'POST', body});
      if (res) {
        alert('add new video successfully');
        //TODO: add the newest video to the list;
        const newVideo = {num_comments:0, created_at:'', id:'',...body};
        console.log('is going to be add before rerender page:', newVideo);
      }
    } catch(error) {
      alert(error)
    }
    dispatch(toggleModal(false))
  }
  return (
    <Modal onClose={() => dispatch(toggleModal(false))}>
      <h1>Add a new video</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="input-wrap">
          <label htmlFor="title">title</label>
          <input name="title" type="text" required />
        </div>
        <div className="input-wrap">
          <label htmlFor="description">Description</label>
          <textarea name="description" className="border rounded shadow-md h-16"/>
        </div>
        <div className="input-wrap">
          <label htmlFor="video_url">Url</label>
          <input name="video_url" type="text" required />
        </div>
        <button type="submit" className="my-4 green-btn">Add</button>
      </form>
    </Modal>
  )
}
export default AddVideoForm;