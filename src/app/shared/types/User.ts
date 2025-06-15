export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'master';
  __v?: number;
  active?: boolean;
};
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  confirmEmail: string;
};
export interface LoginPayload {
  email: string;
  password: string;
};
export interface LoginResponse {
  status: 'success';
  token: string;
};
export interface RegisterResponse {
  status: 'success';
  token: string;
  data: {
    user: AuthUser;
  };
};
export interface MeResponse {
  status: 'success';
  data: {
    user: AuthUser;
  };
};


