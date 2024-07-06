import { CardWrapper } from '@/components/auth/cardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
      headerLabel='Oops! Something went wrong'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive w-12 h-12' />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
