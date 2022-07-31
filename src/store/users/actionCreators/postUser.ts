import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'store/users/types';
import { SLICE_NAME } from 'store/users/constants';
import { REQUEST_STATUS } from 'types/RequestStatuses';
// eslint-disable-next-line import/no-cycle
import { setCreatingStatus } from 'store/users/slice';

interface Params {
  newUser: User;
  cb?: () => void;
}

export const postUserServer = createAsyncThunk<User, Params>(`${SLICE_NAME}/postUser`, async ({ newUser, cb }, { dispatch }) => {
  try {
    const response = await axios.post('https://62dd8721ccdf9f7ec2c979a1.mockapi.io/itprofit', { ...newUser });
    if (cb) {
      cb();
    }
    setTimeout(() => {
      dispatch(setCreatingStatus(REQUEST_STATUS.PENDING));
    });
    return response.data;
  } catch (e) {
    throw new Error('Ошибка добавления пользователя');
  }
});
