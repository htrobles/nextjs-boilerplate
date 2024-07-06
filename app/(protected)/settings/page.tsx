import { auth, signOut } from '@/auth';
import { LOGIN_PATH } from '@/routes';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: LOGIN_PATH });
        }}
      >
        <button type='submit'>Logout</button>
      </form>
    </div>
  );
};

export default SettingsPage;
