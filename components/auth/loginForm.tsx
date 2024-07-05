import { CardWrapper } from './cardWrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel='Welcome Back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial
    >
      Loigin Form
    </CardWrapper>
  );
};
