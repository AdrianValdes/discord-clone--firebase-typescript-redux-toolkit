import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { auth, provider } from '../firebase';

export interface UserState {
  uid: string;
  photo: string | null;
  email: string | null;
  displayName: string | null;
}

interface Error {
  error: null | string;
}

const initialState = {
  user: (null as unknown) as UserState,
  error: (null as unknown) as Error,
};

export const signInUser = createAsyncThunk('user/signInUser', async () => {
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    return error;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null as any;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, () => {
      if (auth.currentUser) {
        const { uid, photoURL, displayName, email } = auth.currentUser!;
        login({ uid, photo: photoURL, email, displayName });
      }
    });
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export const userReducer = userSlice.reducer;
