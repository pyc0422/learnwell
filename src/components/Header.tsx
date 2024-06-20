'use client'
import Image from "next/image";
import FullLogo from '../../public/FULL_LOGO_COLOR.png';
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { toggleModal } from "@/store/modalSlice";
const Header:React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    document.cookie=`userId=;`;
    dispatch(toggleModal(false));
    router.push('/');
  }
  return (
    <nav className="flex justify-evenly gap-5 h-16 w-screen content-center items-center border-bottom shadow-lg">
      <Image src={FullLogo} alt="Learn well logo" className="w-auto p-2"/>
      {pathname !=='/login' && pathname !== '/'
        && (
        <div className="flex gap-5">
          <button
           onClick ={() => dispatch(toggleModal(true))}
           className="bg-yellow px-2 py-1 md:w-36"
          >Add Video</button>
          <button
           onClick={handleLogOut}
           className="bg-green px-2 py-1 md:w-36"
          >LogOut</button>
        </div>
        )}
    </nav>
  )
}

export default Header;