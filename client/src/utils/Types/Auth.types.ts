export interface IUser {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: Number;
  address?: string;
  permisions?: string[];
  role?: "customer" | "admin" | "vendor";
}
export type Role = "admin" | "vendor" | "customer";
// ProtectedRouteProps
export interface ProtectedRouteProps {
  allowedRoles: Role[];
}

// ILoginCredential
export interface ILoginCredential {
  email: string;
  password: string;
}
// IRegisterCredential
export interface IRegisterCredential {
  user: IUser;
}

// IAuthResponse
export interface IAuthResponse {
  user: IUser;
  message?: string;
}
