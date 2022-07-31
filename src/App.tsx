import React, { useEffect, useRef, useState } from 'react';

import style from 'App.module.scss';
import { useAppDispatch, useAppSelector } from 'store/types';
import { postUserServer } from 'store/users/actionCreators/postUser';
import { User, userInfo } from 'store/users/types';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { REQUEST_STATUS } from 'types/RequestStatuses';
import { validateEmail } from 'validation/validate/validateEmail';
import { validateFirstAndSecondName } from 'validation/validate/validateFirstAndSecondName';
import { validatePhone } from 'validation/validate/validatePhone';
import { validateMessage } from 'validation/validate/validateMessage';
import { validateBirthday } from 'validation/validate/validateBirthday';

const FORM_VALUES: User = {
  firstAndSecondName: '',
  email: '',
  phone: '',
  birthday: '',
  message: '',
};

const Info: userInfo[] = [
  { name: 'firstAndSecondName', placeholder: 'Имя фамилия', type: 'input', property: { textTransform: 'upperCase' } },
  { name: 'email', placeholder: 'E-mail', type: 'input' },
  { name: 'phone', placeholder: 'Телефон в формате +7', type: 'input' },
  { name: 'birthday', placeholder: 'Дата рождения', type: 'date' },
  { name: 'message', placeholder: 'Сообщение', type: 'input' },
];

const App: React.FC = () => {
  const ref = useRef<FormikProps<User>>(null);
  const valFunc = {
    valFirstAndSecondName: validateFirstAndSecondName,
    valEmail: validateEmail,
    valPhone: validatePhone,
    valBirthday: validateBirthday,
    valMessage: validateMessage,
  };

  const [stateMessage, setStateMessage] = useState(false);
  const renderMessage = () => (
    <div className={style.success}>
      <div className={style.success_inner}>Сообщение успешно отправлено</div>
    </div>
  );

  const creatingStatus = useAppSelector((state) => state.users.creatingStatus);
  const isLoading = creatingStatus === REQUEST_STATUS.LOADING;
  const isSuccess = creatingStatus === REQUEST_STATUS.SUCCESS;
  const isError = creatingStatus === REQUEST_STATUS.ERROR;
  useEffect(() => {
    if (isSuccess) {
      setStateMessage(true);
    }
    setTimeout(setStateMessage, 2500);
  }, [isSuccess]);

  const dispatch = useAppDispatch();
  const switchBtnState = () => {
    switch (creatingStatus) {
      case REQUEST_STATUS.LOADING:
        return 'Отправляем';
      case REQUEST_STATUS.PENDING:
        return 'Отправить';
      case REQUEST_STATUS.SUCCESS:
        return 'Отправлено';
      case REQUEST_STATUS.ERROR:
        return 'Ошибка отправки';
      default:
        return 'Отправить';
    }
  };

  return (
    <div className={style.App}>
      <Formik
        initialValues={FORM_VALUES}
        onSubmit={(user, { resetForm }) => {
          dispatch(postUserServer({ newUser: user, cb: resetForm }));
        }}
        innerRef={ref}
      >
        <Form className={style.form}>
          {Info.map(({ name, placeholder, type, property }, i) => (
            <div className={style.form_inner} key={uuidv4()}>
              <Field className={style.field} name={name} validate={Object.values(valFunc)[i]} style={property} type={type} placeholder={placeholder} />
              <ErrorMessage className={style.invalid} name={name} component="div" />
            </div>
          ))}
          <div className={style.button}>
            <div className={style.center}>
              <button className={cn(style.btn, { [style.btn_disabled]: isLoading, [style.btn_error]: isError })} type="submit" disabled={isLoading}>
                <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                  <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                  <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                </svg>
                <span>{switchBtnState()}</span>
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      {stateMessage && renderMessage()}
    </div>
  );
};

export default App;
