import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Button,
  TableSortLabel,
} from '@mui/material';
import type { User } from '../../store/slices/usersSlice';
import { stringAvatar } from '../../utils/helpers';

export interface UserTableProps {
  users: User[];
  sortDirection: 'asc' | 'desc';
  onSort: () => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, sortDirection, onSort, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'error';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'error';
      case 'Moderator':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel active={true} direction={sortDirection} onClick={onSort}>
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Avatar {...stringAvatar(user.name)} />
                    <span style={{ fontWeight: 500 }}>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span style={{ color: 'text.secondary' }}>{user.email}</span>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={getRoleColor(user.role) as 'error' | 'warning' | 'default'}
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <Chip label={user.status} color={getStatusColor(user.status) as 'success' | 'error'} size='small' />
                </TableCell>
                <TableCell>
                  <Button size='small' color='primary' onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                  <Button size='small' color='error' onClick={() => onDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
