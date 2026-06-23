import type { LoginResponseDTO } from "~~/shared/types/auth.types";

const COOKIE_NAME = "flashcards_auth";
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

/**
 * Owner sign-in state. Authentication is persisted in a 30-day cookie; when it
 * is set, flashcards live in MongoDB, otherwise they live in localStorage.
 *
 * The reactive flag lives in `useState` (not the cookie ref directly) so every
 * `useAuth()` caller shares one source of truth — `useCookie` returns an
 * independent ref per call, so watchers on one instance never see writes made
 * through another.
 */
export function useAuth() {
  const authCookie = useCookie<boolean | null>(COOKIE_NAME, {
    maxAge: THIRTY_DAYS_IN_SECONDS,
    sameSite: "lax",
    path: "/",
  });

  const isAuthenticated = useState(
    "auth:isAuthenticated",
    () => authCookie.value === true,
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { success } = await $fetch<LoginResponseDTO>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (success) {
        authCookie.value = true;
        isAuthenticated.value = true;
      }
      return success;
    } catch {
      // 400/401 from the server means the credentials were wrong or missing.
      return false;
    }
  };

  const logout = () => {
    authCookie.value = null;
    isAuthenticated.value = false;
  };

  return { isAuthenticated, login, logout };
}
