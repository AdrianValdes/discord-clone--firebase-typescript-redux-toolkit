import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { auth, provider } from '../firebase';

export interface User {
  uid: string;
  photo: string | null;
  email: string | null;
  displayName: string | null;
}

interface Error {
  error: string;
}

interface Login {
  user: User | null;
  error: Error | null;
}

const initialState: Login = {
  user: null,
  error: null,
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
    login: (state, action: PayloadAction<User>) => {
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
