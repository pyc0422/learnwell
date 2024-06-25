'use client'
import Image from "next/image";
import FullLogo from '../../public/FULL_LOGO_COLOR.png';
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { toggleModal } from "@/store/modalSlice";
import ThemeToggle from "./ToggleTheme";
import Link from "next/link";
import { useState } from "react";
const Header:React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [memuOpen, toggleMenu] = useState<boolean>(false)
  const handleLogOut = () => {
    document.cookie=`userId=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch(toggleModal(false));
    router.push('/');
  }
  return (
    <nav className="flex justify-between gap-5 h-16 px-16 w-screen content-center items-center border-bottom shadow-lg">
      <a href={'/'}><Image src={FullLogo} priority alt="Learn well logo" className="w-auto md:p-2" /></a>
      <div className="flex gap-5 items-center">
       <button
          onClick={() => toggleMenu(!memuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className={`md:flex gap-5 ${memuOpen ? 'absolute top-16 left-0 bg-white shadow-md bg-opacity-90 px-16 py-4' : 'hidden'} w-full md:w-auto items-center`}>

          {pathname !=='/login' && pathname !== '/'
            && (
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <button
              onClick ={() => {toggleMenu(false); dispatch(toggleModal(true))}}
              className="bg-yellow px-2 py-1 md:w-36 text-white"
              >Add Video</button>
              <button
              onClick={handleLogOut}
              className="bg-green px-2 py-1 md:w-36 text-white"
              >LogOut</button>
            </div>
          )}
        </div>
      <ThemeToggle />
      </div>
    </nav>
  )
}

export default Header;