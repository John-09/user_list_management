import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction,AnyAction } from '@reduxjs/toolkit';
import type { AuthResponse, AuthState, LoginRegisterPayload } from '../Interface/LoginInterface';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

//Async thunks for login and register
export const loginUser = createAsyncThunk<AuthResponse, LoginRegisterPayload>(
  'auth/login',
  async (credentials) => {
    const res = await fetch(`https://reqres.in/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','x-api-key': 'reqres-free-v1' },
      body: JSON.stringify(credentials),
    });
    console.log('Login response:', res);
    
    if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.error || 'Login failed');
      }
    return res.json();
  }
);

export const registerUser = createAsyncThunk<AuthResponse, LoginRegisterPayload>(
  'auth/register',
  async (data) => {
    const res = await fetch(`https://reqres.in/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Register failed');
    return res.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addMatcher((a) => a.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        (a): a is AnyAction => a.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          console.log(action.error);
          state.error = action.error?.message || 'Something went wrong';
        }
      )
      .addMatcher((a) => a.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
