export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}
export interface signIn {
  signIn: {
    user: User;
    token: string;
  };
}
export interface signUp {
  signUp: {
    user: User;
    token: string;
  };
}
export interface Credentials {
  user: User;
  token: string;
}
export interface LoginContext {
  email: string;
  password: string;
}
export interface SignInContext {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
