import * as yup from 'yup';
import validator from 'validator';
import type { User } from '../store/slices/usersSlice';
import { ModalMode } from '../types';

export const createEmailValidation = (users: User[], mode: ModalMode, currentUser?: User | null) => {
  return yup
    .string()
    .required('Email is required')
    .test('email-format', 'Please enter a valid email address', value => {
      if (!value) return true;
      return validator.isEmail(value);
    })
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters')
    .test('unique-email', 'Email already exists', function (value) {
      if (!value) return true;
      const existingUser = users.find(u => u.email.toLowerCase() === value.toLowerCase());
      if (mode === ModalMode.EDIT && currentUser) {
        return !existingUser || existingUser.id === currentUser.id;
      }
      return !existingUser;
    });
};

export const emailValidationRules = {
  required: 'Email is required',
  validate: {
    emailFormat: (value: string) => validator.isEmail(value) || 'Please enter a valid email address',
  },
  minLength: {
    value: 5,
    message: 'Email must be at least 5 characters',
  },
  maxLength: {
    value: 100,
    message: 'Email must be less than 100 characters',
  },
};

export const validateEmailFormat = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validateEmailUniqueness = (
  email: string,
  users: User[],
  mode: ModalMode,
  currentUser?: User | null
): boolean => {
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (mode === ModalMode.EDIT && currentUser) {
    return !existingUser || existingUser.id === currentUser.id;
  }
  return !existingUser;
};
