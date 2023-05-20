'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  session: Session | null;
  children: React.ReactNode;
}

const Provider = (props: ProviderProps) => {
  const { children, session } = props;
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
