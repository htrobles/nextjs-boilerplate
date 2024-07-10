import { auth } from '@/auth';

export const currentUser = async () => {
  const sessions = await auth();

  return sessions?.user;
};
