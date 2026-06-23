/**
 * Verify a sign-in attempt against the single owner credential held in
 * runtime config (AUTH_EMAIL / AUTH_PASSWORD). There is no users collection —
 * this is a solo, personal app — so there is no model or mapper for auth.
 */
export const verifyCredentials = (email: string, password: string): boolean => {
  const { authEmail, authPassword } = useRuntimeConfig();

  // Bail out if credentials were never configured rather than matching "".
  if (!authEmail || !authPassword) return false;

  return email === authEmail && password === authPassword;
};
