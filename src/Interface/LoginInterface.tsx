export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginRegisterPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
