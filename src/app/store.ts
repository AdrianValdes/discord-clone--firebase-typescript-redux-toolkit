import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { userReducer } from '../autenthication/userSlice';
import { channelReducer } from '../channels/channelSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
