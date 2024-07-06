/**
 * Public Routes
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * Routes used for authentication.
 * This routes will redirect logged in users to the default login redirect path.
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * Prefix for API Authentication Routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';