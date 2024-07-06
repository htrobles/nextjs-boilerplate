'use client';

import { LOGIN_PATH } from '@/routes';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(LOGIN_PATH);
  };

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
};

export default LoginButton;
