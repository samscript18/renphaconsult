import { DefaultModel } from ".";
import { RoleNames } from "../enums/user.enum";

export interface User extends DefaultModel {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  role?: RoleNames;
}
