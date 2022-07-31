import { validateFun } from 'validation/types';
import { regExpEmail } from 'validation/regExp';

export const validateEmail: validateFun = (value) => {
  let error;
  if (!value) {
    error = 'Введите email';
  } else if (!regExpEmail.test(value)) {
    error = 'Неверный email адрес';
  }
  return error;
};
