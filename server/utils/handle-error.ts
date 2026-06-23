import { H3Error } from "h3";

// Wraps unexpected failures (e.g. a dropped DB connection) in a clean 503 so the
// client gets a meaningful status instead of a raw 500, while letting intentional
// HTTP errors (validation, not-found, auth) thrown via createError pass through.
export function handleApiError(error: unknown, context: string): never {
  if (error instanceof H3Error) {
    throw error;
  }

  console.error(`[api] ${context} failed:`, error);
  throw createError({
    statusCode: 503,
    statusMessage: "Service temporarily unavailable",
  });
}
