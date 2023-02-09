export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserDto extends IUserCredentials {
  name: string;
  phone: string;
}

export interface IUser extends Omit<IUserDto, "password"> {
  id: number;
  position?: string;
  skype?: string;
}

export type TUpdateUserDto = Partial<Omit<IUser, "id" | "password">>;
