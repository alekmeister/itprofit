import { REQUEST_STATUS } from 'types/RequestStatuses';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'store/users/constants';
import type { State } from 'store/users/types';
// eslint-disable-next-line import/no-cycle
import { postUserServer } from 'store/users/actionCreators/postUser';

const getInitialState = (): State => ({
  status: REQUEST_STATUS.PENDING,
  creatingStatus: REQUEST_STATUS.PENDING,
});

const slice = createSlice({
  name: SLICE_NAME,
  initialState: getInitialState(),
  reducers: {
    setCreatingStatus: (state, action: PayloadAction<REQUEST_STATUS>) => {
      state.creatingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Создание пользователя
    builder.addCase(postUserServer.pending, (state) => {
      state.creatingStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(postUserServer.fulfilled, (state) => {
      state.creatingStatus = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(postUserServer.rejected, (state) => {
      state.creatingStatus = REQUEST_STATUS.ERROR;
    });
  },
});
export const { setCreatingStatus } = slice.actions;
export default slice.reducer;
