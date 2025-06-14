export interface UserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  confirmEmail: string;
};

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'master';
  __v?: number;
  active?: boolean;
};
export interface LoginPayload {
  email: string;
  password: string;
};
export interface LoginResponse {
  status: 'success';
  token: string;
};
export interface SignupResponse {
  status: 'success';
  token: string;
  data: {
    user: AuthUser;
  };
};
export interface GetMeResponse {
  status: 'success';
  data: {
    user: AuthUser;
  };
}


