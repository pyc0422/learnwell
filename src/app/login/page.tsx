'use client';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { getFormInput } from '@/utils/helpers';
const Auth:React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const first = getFormInput(form, 'first');
    const last = getFormInput(form, 'last');
    document.cookie = `userId=${first}-${last}`
    router.push('/home');
  }
  return (
    <div className="min-h-fit w-1/2 border bg-gray-300 bg-opacity-50 shadow-md rounded my-8 mx-auto p-4">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-3 my-10'>

        <label htmlFor="first">First Name:</label>
        <input id="first" type="text" required />

        <label htmlFor="last">Last Name:</label>
        <input id="last" type="text" required />

        <button type="submit" className='mt-8 green-btn'>Start</button>
      </form>
    </div>

  )
}

export default Auth;