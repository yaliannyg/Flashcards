/** Body sent when the owner signs in from the auth modal. */
export interface LoginRequestDTO {
  email: string;
  password: string;
}

/** Result of a sign-in attempt. */
export interface LoginResponseDTO {
  success: boolean;
}
