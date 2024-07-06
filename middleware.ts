import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

// Guide to protected routes found here: https://authjs.dev/getting-started/session-management/protecting?framework=express#nextjs-middleware

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log('ROUTE: ', req.nextUrl.pathname);
  console.log('IS LOGGED IN: ', isLoggedIn);
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
