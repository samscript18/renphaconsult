import { Interests, RoleNames } from "../enums/user.enum";

export type EditProfileDTO = Partial<{
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  bio: string;
  phoneNumber: string;
  location: string;
  job: string;
  interest: Interests[];
  role: RoleNames[];
}>;
