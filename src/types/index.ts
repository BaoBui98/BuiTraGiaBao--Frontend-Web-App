export interface UserProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}
export type AddUserProps = Omit<UserProps, "id">;
export interface LoginProps {
  email: string;
  password: string;
}
export enum Gender {
  male = "Male",
  female = "Female",
  other = "Other",
}
