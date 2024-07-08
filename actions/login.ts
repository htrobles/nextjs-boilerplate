'use server';

import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/twoFactorConfirmation';
import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Login failed' };
  }
  console.log({ values, success: validatedFields.success });

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { error: 'Please verify your email' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: 'Invalid code' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'Code expired' };
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Login succesful' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        case 'AccessDenied':
          return { error: 'Invalid credentials' };
        case 'CallbackRouteError':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong.' };
      }
    }

    /**
     * Do not remove this. Redirect does not work if throw error is not present.
     */
    throw error;
  }
};
