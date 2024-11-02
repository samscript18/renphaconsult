import { RoleNames } from "../enums/user.enum";

export interface SignUpDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: RoleNames;
}

export interface LoginDTO {
  email: string;
  password: string;
}
