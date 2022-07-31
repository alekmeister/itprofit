import { validateFun } from 'validation/types';

export const validateMessage: validateFun = (value) => {
  let error;
  if (!value) {
    error = 'Введите сообщение';
  } else if (value.length <= 10) {
    error = 'Поле “Сообщение” должно иметь минимальную длину в 10 символов и максимальную в 300';
  } else if (value.length >= 300) {
    error = 'Поле “Сообщение” должно иметь минимальную длину в 10 символов и максимальную в 300';
  }
  return error;
};
