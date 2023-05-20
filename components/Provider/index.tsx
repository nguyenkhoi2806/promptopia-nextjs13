'use client';

import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = (props: ProviderProps) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
