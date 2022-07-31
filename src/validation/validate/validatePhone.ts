import { validateFun } from 'validation/types';
import { regExpPhone } from 'validation/regExp';

export const validatePhone: validateFun = (value) => {
  let error;
  if (!value) {
    error = 'Введите номер в формате +7';
  } else if (!regExpPhone.test(value)) {
    error = 'Неверный номер';
  }
  return error;
};
