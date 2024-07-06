import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_PATH,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

// Guide to protected routes found here: https://authjs.dev/getting-started/session-management/protecting?framework=express#nextjs-middleware

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL(LOGIN_PATH, nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
