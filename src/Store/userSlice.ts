import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {User, UserState} from '../Interface/UserInterface';


const initialState: UserState = {
  userList: [],
  loading: false,
  error: null,
  status: "idle",
};

// Async thunks
export const fetchUsers = createAsyncThunk<User[], number>(
  'users/fetch',
  async (page) => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });
    if (!res.ok) throw new Error('Fetch users failed');
    const data = await res.json();
    console.log('Fetched users:', data.data);
    
    return data.data;
  }
);

export const createUser = createAsyncThunk<User, { name: string; job: string }>(
  'users/create',
  async (newUser) => {
    const res = await fetch(`https://reqres.in/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','x-api-key': 'reqres-free-v1' },
      body: JSON.stringify(newUser),
    });
    if (!res.ok) throw new Error('Create user failed');
    return res.json();
  }
);

export const editUser = createAsyncThunk<User, { id: number; updates: Partial<User> }>(
  'users/edit',
  async ({ id, updates }) => {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','x-api-key': 'reqres-free-v1' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Edit user failed');
    return res.json();
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  'users/delete',
  async (id) => {
    const res = await fetch(`https://reqres.in/api/users/${id}`, { method: 'DELETE',headers:{
      'x-api-key': 'reqres-free-v1',   // pass your API key here
    }, });
    if (!res.ok) throw new Error('Delete user failed');
    return id;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.status = 'fetch_loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.userList = action.payload;
        state.loading = false;
        state.status = 'fetch_succeeded';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.status = 'fetch_failed';
        state.error = action.error.message || 'Fetch users failed';
      })

      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.status = 'create_loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.userList.push(action.payload);
        state.loading = false;
        state.status = 'create_succeeded';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'create_failed';
        state.error = action.error.message || 'Create user failed';
      })

      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.status = 'edit_loading';
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User, string, { arg: { id: number; updates: Partial<User> } }>) => {
        const index = state.userList.findIndex(u => u.id === action.meta.arg.id);
        if (index !== -1) {
          state.userList[index] = {
            ...state.userList[index],
            ...action.meta.arg,        
            updatedAt: action.payload.updatedAt
          };
        }
        state.loading = false;
        state.status = 'edit_succeeded';
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'edit_failed';
        state.error = action.error.message || 'Edit user failed';
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.status = 'delete_loading';
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.userList = state.userList.filter((u) => u.id !== action.payload);
        state.loading = false;
        state.status = 'delete_succeeded';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'delete_failed';
        state.error = action.error.message || 'Delete user failed';
      });
  },
});


export default userSlice.reducer;
