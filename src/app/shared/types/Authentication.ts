import { User } from "./User";

export interface LoginResponse {
  status: 'success';
  token: string;
};

export interface LoginPayload {
  email: string;
  password: string;
};

export interface MeResponse {
  status: 'success';
  data: {
    user: User;
  };
};
