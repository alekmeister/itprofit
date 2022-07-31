import { validateFun } from 'validation/types';

const errorName = 'Поле “Имя Фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита. Минимальная длина каждого слова 3 символа, максимальная 30. Между словами может быть только 1 пробел.';

export const validateFirstAndSecondName: validateFun = (value) => {
  let error;
  if (Array.isArray(value)) return '';
  const inputValidate = value.toUpperCase().replace(/ /g, ' SPACEFORVALIDATE ').split(' ');
  // Валидация на пустоту
  if (!value) {
    error = 'Введите Имя и Фамилию';
  }
  // Валидация на количество слов
  else if (inputValidate.length !== 3) {
    return errorName;
    // Валидация на длину слов
  } else if (inputValidate.map((el) => el.length < 3).includes(true)) {
    return errorName;
  } else if (inputValidate.map((el) => el.length > 30).includes(true)) {
    return errorName;
  }
  return error;
};
