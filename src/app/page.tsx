'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
const RootPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = document.cookie.split('=')[1]

    if (!userId) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  }, [router]);

  return <Loading />;
};

export default RootPage;
