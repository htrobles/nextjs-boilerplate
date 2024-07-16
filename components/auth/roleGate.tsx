'use client';

import { FormError } from '@/components/formError';
import { useCurrentRole } from '@/hooks/useCurrentRoles';
import { UserRole } from '@prisma/client';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGatge = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permission to view this content' />
    );
  }

  return <>{children}</>;
};

export default RoleGatge;
