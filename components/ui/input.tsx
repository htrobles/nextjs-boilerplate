import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    let inputType;

    if (type === 'password') {
      inputType = showPassword ? 'text' : 'password';
    } else {
      inputType = type;
    }

    return (
      <div className='relative'>
        <input
          type={inputType}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent pl-3 pr-9 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={toggleShowPassword}
            className='absolute inset-y-0 right-0 px-3 py-2 text-gray-500 focus:outline-none'
          >
            {showPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
