import { validateFun } from 'validation/types';

const maxDate = new Date().toISOString().split('T')[0];

export const validateBirthday: validateFun = (value) => {
  let error;
  if (!value) {
    error = 'Введите дату рождения';
  } else if (value > maxDate) {
    error = 'Дата должна быть не позднее сегодняшнего дня';
  }
  return error;
};
