'use client'

import AddVideoForm from "@/components/AddVideoForm";
import { useAppDispatch, useAppSelector} from "@/store/store";
import { clearCurVideo } from "@/store/videoSlice";
import { useEffect } from "react";

export default function VideoPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = useAppSelector(state => state.modal.isOpen)
  const curVideo = useAppSelector(state => state.video.curVideo);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isOpen) {
      dispatch(clearCurVideo())
    }
  }, [isOpen])

  return (
    <>
      {children}
      {isOpen && <AddVideoForm video={curVideo ? curVideo : undefined} />}
    </>


  );
}

