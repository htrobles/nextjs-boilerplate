'use client';

import { logout } from '@/actions/logout';
import { useCurrentSession } from '@/hooks/useCurrentSession';

const SettingsPage = () => {
  const { session } = useCurrentSession();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {JSON.stringify(session)}
      <button type='submit' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
