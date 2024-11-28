export type SignupCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ForgotPasswordCredentials = {
  email: string;
};

export type UpdateProfileFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  uid: string;
};

export type NewUser = Omit<User, "_id" | "name">;
