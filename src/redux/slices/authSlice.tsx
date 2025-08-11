import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  email: string | null;
  username: string | null;
  uid: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  email: null,
  username: null,
  uid: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<UserState>) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.uid = action.payload.uid;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.username = null;
      state.uid = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
