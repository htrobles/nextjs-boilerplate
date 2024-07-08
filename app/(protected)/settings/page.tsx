'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <button type='submit' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
