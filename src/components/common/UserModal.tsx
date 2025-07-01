import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import * as yup from 'yup';
import type { User } from '../../store/slices/usersSlice';
import { UserRole, UserStatus, ModalMode } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { createEmailValidation } from '../../utils/validation';

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Omit<User, 'id'>) => void;
  user?: User | null;
  mode: ModalMode;
}

interface FormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onSave, user, mode }) => {
  const users = useAppSelector(state => state.users.users);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const userSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: createEmailValidation(users, mode, user),
    role: yup.string().oneOf(Object.values(UserRole), 'Invalid role').required('Role is required'),
    status: yup.string().oneOf(Object.values(UserStatus), 'Invalid status').required('Status is required'),
  });

  useEffect(() => {
    if (user && mode === ModalMode.EDIT) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
        status: user.status as UserStatus,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      });
    }
    setErrors({});
    setTouched({});
  }, [user, mode, open]);

  const validateField = async (field: keyof FormData, value: string) => {
    try {
      await userSchema.validateAt(field, { [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: error.message }));
      }
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path as keyof FormErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (isValid) {
      const userData: Omit<User, 'id'> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: formData.status,
      };
      onSave(userData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{mode === ModalMode.ADD ? 'Add New User' : 'Edit User'}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            label='Name'
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            fullWidth
            margin='normal'
            error={!!errors.name && touched.name}
            helperText={touched.name ? errors.name : ''}
            required
          />
          <TextField
            label='Email'
            type='email'
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            fullWidth
            margin='normal'
            error={!!errors.email && touched.email}
            helperText={touched.email ? errors.email : ''}
            required
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              label='Role'
              onChange={e => handleSelectChange('role', e.target.value)}
              onBlur={() => handleBlur('role')}
              error={!!errors.role && touched.role}
            >
              <MenuItem value={UserRole.USER}>{UserRole.USER}</MenuItem>
              <MenuItem value={UserRole.MODERATOR}>{UserRole.MODERATOR}</MenuItem>
              <MenuItem value={UserRole.ADMIN}>{UserRole.ADMIN}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label='Status'
              onChange={e => handleSelectChange('status', e.target.value)}
              onBlur={() => handleBlur('status')}
              error={!!errors.status && touched.status}
            >
              <MenuItem value={UserStatus.ACTIVE}>{UserStatus.ACTIVE}</MenuItem>
              <MenuItem value={UserStatus.INACTIVE}>{UserStatus.INACTIVE}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          {mode === 'add' ? 'Add User' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
