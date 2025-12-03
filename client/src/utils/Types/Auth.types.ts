export interface IUser {
  _id?: any;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: Number;
  address?: string;
  permisions?: string[];
  role?: "customer" | "admin" | "vendor";
  avatar?: string;
  shopName?: string;
  gstNumber?: string;
  createdAt?: any;
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
