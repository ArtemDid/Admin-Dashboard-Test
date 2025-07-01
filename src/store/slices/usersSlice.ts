import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserRole, UserStatus } from '../../types';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

interface UsersState {
  users: User[];
  sortDirection: 'asc' | 'desc';
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: UserRole.USER,
      status: UserStatus.INACTIVE,
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: UserRole.MODERATOR,
      status: UserStatus.ACTIVE,
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    },
    {
      id: 6,
      name: 'Diana Davis',
      email: 'diana.davis@example.com',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
    {
      id: 7,
      name: 'Edward Miller',
      email: 'edward.miller@example.com',
      role: UserRole.USER,
      status: UserStatus.INACTIVE,
    },
    {
      id: 8,
      name: 'Fiona Garcia',
      email: 'fiona.garcia@example.com',
      role: UserRole.MODERATOR,
      status: UserStatus.ACTIVE,
    },
    {
      id: 9,
      name: 'George Taylor',
      email: 'george.taylor@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    },
    {
      id: 10,
      name: 'Helen Anderson',
      email: 'helen.anderson@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    },
  ],
  sortDirection: 'asc',
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload;
    },
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newId = Math.max(...state.users.map(user => user.id)) + 1;
      state.users.push({ ...action.payload, id: newId });
    },
    updateUser: (state, action: PayloadAction<{ id: number; userData: Omit<User, 'id'> }>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = {
          ...action.payload.userData,
          id: action.payload.id,
        };
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSortDirection, addUser, updateUser, deleteUser, setLoading, setError } = usersSlice.actions;

export default usersSlice.reducer;
