import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(6, { message: 'Minimum 6 characters required' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Minimum 6 characters required' }),
    name: z.string().min(1, { message: 'Name is required' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
