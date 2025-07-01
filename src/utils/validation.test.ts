import { describe, it, expect } from 'vitest';
import { validateEmailFormat, validateEmailUniqueness } from './validation';
import { ModalMode, UserStatus, UserRole } from '../types';
import type { User } from '../store/slices/usersSlice';

describe('validateEmailFormat', () => {
  it('should validate correct email formats', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.org',
      'user123@test-domain.com',
      'user_name@example.com',
      'user-name@example.com',
      'user.name@example.com',
      'user+name@example.com',
      'user%name@example.com',
    ];

    validEmails.forEach(email => {
      expect(validateEmailFormat(email)).toBe(true);
    });
  });

  it('should reject invalid email formats', () => {
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'user@',
      'user@.com',
      'user..name@example.com',
      '.user@example.com',
      'user.@example.com',
      'user@example.',
      'user@example..com',
      'user name@example.com',
      'user@example com',
      'user@example..com',
      'user@-example.com',
      'user@example-.com',
    ];

    invalidEmails.forEach(email => {
      expect(validateEmailFormat(email)).toBe(false);
    });
  });

  it('should handle edge cases', () => {
    expect(validateEmailFormat('')).toBe(false);
    expect(validateEmailFormat('   ')).toBe(false);
    expect(validateEmailFormat('a@b')).toBe(false); // too short domain
    expect(validateEmailFormat('a@b.c')).toBe(false); // too short domain
  });
});

describe('validateEmailUniqueness', () => {
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: UserRole.ADMIN, status: UserStatus.ACTIVE },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: UserRole.USER, status: UserStatus.ACTIVE },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: UserRole.USER, status: UserStatus.INACTIVE },
  ];

  it('should allow unique emails for new users', () => {
    const result = validateEmailUniqueness('new@example.com', mockUsers, ModalMode.ADD);
    expect(result).toBe(true);
  });

  it('should reject duplicate emails for new users', () => {
    const result = validateEmailUniqueness('john@example.com', mockUsers, ModalMode.ADD);
    expect(result).toBe(false);
  });

  it('should allow case-insensitive duplicate detection', () => {
    const result = validateEmailUniqueness('JOHN@EXAMPLE.COM', mockUsers, ModalMode.ADD);
    expect(result).toBe(false);
  });

  it('should allow user to keep their own email when editing', () => {
    const currentUser = mockUsers[0];
    const result = validateEmailUniqueness('john@example.com', mockUsers, ModalMode.EDIT, currentUser);
    expect(result).toBe(true);
  });

  it('should reject other users email when editing', () => {
    const currentUser = mockUsers[0];
    const result = validateEmailUniqueness('jane@example.com', mockUsers, ModalMode.EDIT, currentUser);
    expect(result).toBe(false);
  });

  it('should allow user to change to unique email when editing', () => {
    const currentUser = mockUsers[0];
    const result = validateEmailUniqueness('new@example.com', mockUsers, ModalMode.EDIT, currentUser);
    expect(result).toBe(true);
  });

  it('should handle empty users array', () => {
    const result = validateEmailUniqueness('test@example.com', [], ModalMode.ADD);
    expect(result).toBe(true);
  });
});
