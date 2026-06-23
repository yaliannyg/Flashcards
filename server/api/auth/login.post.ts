import { verifyCredentials } from "~~/server/services/auth.service";
import { handleApiError } from "~~/server/utils/handle-error";
import type { LoginRequestDTO, LoginResponseDTO } from "~~/shared/types/auth.types";

export default defineEventHandler(async (event): Promise<LoginResponseDTO> => {
  try {
    const { email, password } = await readBody<LoginRequestDTO>(event);

    if (!email || !password) {
      throw createError({ statusCode: 400, statusMessage: "Email and password are required" });
    }

    if (!verifyCredentials(email, password)) {
      throw createError({ statusCode: 401, statusMessage: "Invalid email or password" });
    }

    return { success: true };
  } catch (error) {
    handleApiError(error, "POST /api/auth/login");
  }
});
