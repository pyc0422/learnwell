'use client'

import AddVideoForm from "@/components/AddVideoForm";
import { useAppSelector} from "@/store/store";

export default function VideoPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = useAppSelector(state => state.modal.isOpen)
  const curVideo = useAppSelector(state => state.video.curVideo);
  return (
    <>
      {children}
      {isOpen && <AddVideoForm video={curVideo ? curVideo : undefined} />}
    </>


  );
}

