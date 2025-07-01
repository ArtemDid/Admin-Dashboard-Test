import React, { useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setSortDirection, deleteUser, addUser, updateUser } from '../../store/slices/usersSlice';
import UserTable from '../../components/common/UserTable';
import UserModal from '../../components/common/UserModal';
import type { User } from '../../store/slices/usersSlice';
import { ModalMode } from '../../types';

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, sortDirection } = useAppSelector(state => state.users);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.ADD);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [users, sortDirection]);

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch(setSortDirection(newDirection));
  };

  const handleAddUser = () => {
    setModalMode(ModalMode.ADD);
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setModalMode(ModalMode.EDIT);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleSaveUser = (userData: Omit<User, 'id'>) => {
    if (modalMode === 'add') {
      dispatch(addUser(userData));
    } else if (modalMode === 'edit' && selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, userData }));
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' fontWeight='bold' color='primary'>
          Users Management
        </Typography>
        <Button variant='contained' startIcon={<AddIcon />} sx={{ borderRadius: 2 }} onClick={handleAddUser}>
          Add User
        </Button>
      </Box>

      <UserTable
        users={sortedUsers}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={selectedUser}
        mode={modalMode}
      />
    </Box>
  );
};

export default Users;
