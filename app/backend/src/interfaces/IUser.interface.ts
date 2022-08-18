export interface IUserPayload {
  role: string;
  email: string;
}

export default interface IUser extends IUserPayload {
  id?: number;
  username: string;
  password?: string;
}
