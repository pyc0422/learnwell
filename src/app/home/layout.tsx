'use client'

import AddVideoForm from "@/components/AddVideoForm";
import { useAppSelector} from "@/store/store";

export default function VideoPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = useAppSelector(state => state.modal.isOpen)
  return (
    <>
      {children}
      {isOpen && <AddVideoForm />}
    </>


  );
}

