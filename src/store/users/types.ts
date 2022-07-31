import { REQUEST_STATUS } from 'types/RequestStatuses';

export interface User {
  id?: string;
  firstAndSecondName: string;
  email: string;
  phone: string;
  birthday: string;
  message: string;
}

export interface State {
  creatingStatus: REQUEST_STATUS;
}

export type userInfo = {
  name: keyof User;
  placeholder: string;
  property?: string | Record<string, string>;
  type: string;
};
