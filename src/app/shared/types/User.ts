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
  role: 'client' | 'admin' | 'master';
};
