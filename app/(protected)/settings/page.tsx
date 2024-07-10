'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='bg-white p-10 rounded-xl'>
      <button type='submit' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
