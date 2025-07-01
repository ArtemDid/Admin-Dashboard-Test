import { describe, it, expect } from 'vitest';
import { stringAvatar, stringToColor, getRoleColor, getStatusColor } from './helpers';
import { UserRole, UserStatus } from '../types';

describe('stringAvatar', () => {
  it('should generate initials from full name', () => {
    const result = stringAvatar('John Doe');
    expect(result.children).toBe('JD');
  });

  it('should generate single initial for one word name', () => {
    const result = stringAvatar('John');
    expect(result.children).toBe('J');
  });

  it('should handle empty string', () => {
    const result = stringAvatar('');
    expect(result.children).toBe('U');
  });

  it('should handle null/undefined', () => {
    const result = stringAvatar(null as unknown as string);
    expect(result.children).toBe('U');
  });

  it('should handle multiple spaces', () => {
    const result = stringAvatar('  John   Doe  ');
    expect(result.children).toBe('JD');
  });

  it('should return correct sx properties', () => {
    const result = stringAvatar('John Doe');
    expect(result.sx).toEqual({
      bgcolor: expect.any(String),
      width: 40,
      height: 40,
    });
  });

  it('should generate consistent avatar for same name', () => {
    const result1 = stringAvatar('John Doe');
    const result2 = stringAvatar('John Doe');
    expect(result1.children).toBe(result2.children);
    expect(result1.sx.bgcolor).toBe(result2.sx.bgcolor);
  });
});

describe('stringToColor', () => {
  it('should generate hex color from string', () => {
    const color = stringToColor('John Doe');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('should generate consistent color for same string', () => {
    const color1 = stringToColor('John Doe');
    const color2 = stringToColor('John Doe');
    expect(color1).toBe(color2);
  });

  it('should generate different colors for different strings', () => {
    const color1 = stringToColor('John Doe');
    const color2 = stringToColor('Jane Smith');
    expect(color1).not.toBe(color2);
  });

  it('should handle empty string', () => {
    const color = stringToColor('');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('should handle special characters', () => {
    const color = stringToColor('John@Doe#123');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('should handle unicode characters', () => {
    const color = stringToColor('José García');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});

describe('getRoleColor', () => {
  it('should return correct color for Admin role', () => {
    expect(getRoleColor(UserRole.ADMIN)).toBe('#f44336');
  });

  it('should return correct color for Moderator role', () => {
    expect(getRoleColor(UserRole.MODERATOR)).toBe('#ff9800');
  });

  it('should return correct color for User role', () => {
    expect(getRoleColor(UserRole.USER)).toBe('#4caf50');
  });
});

describe('getStatusColor', () => {
  it('should return correct color for Active status', () => {
    expect(getStatusColor(UserStatus.ACTIVE)).toBe('#4caf50');
  });

  it('should return correct color for Inactive status', () => {
    expect(getStatusColor(UserStatus.INACTIVE)).toBe('#f44336');
  });
});
