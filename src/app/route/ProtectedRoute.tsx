import React from 'react';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from '@/state/authAtom';
import { useRouter } from 'next/router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login'); // 로그인 페이지로 리다이렉트
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;