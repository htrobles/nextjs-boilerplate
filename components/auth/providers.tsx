import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = async ({ children }: ProvidersProps) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
