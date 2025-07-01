export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
  MODERATOR = 'Moderator',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ModalMode {
  ADD = 'add',
  EDIT = 'edit',
}

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
export type ThemeModeType = (typeof ThemeMode)[keyof typeof ThemeMode];
export type ModalModeType = (typeof ModalMode)[keyof typeof ModalMode];
