'use client';

import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: 'Something different',
      }).then(() => {
        update();
      });
    });
  };

  return (
    <Card className='max-w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} disabled={isPending}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
