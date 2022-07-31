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
  status: REQUEST_STATUS;
  creatingStatus: REQUEST_STATUS;
}

export type userInfo = { name: string; placeholder: string; property?: string | Record<string, string>; type: string };
