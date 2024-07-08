import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Dispatch, SetStateAction } from 'react';

type PinInput = {
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
};

const PinInput = ({ onChange, value }: PinInput) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <p className='text-center'>
        Please enter the verification code sent to your email.
      </p>
      <InputOTP
        maxLength={6}
        onChange={onChange}
        className='mx-auto'
        value={value}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default PinInput;
