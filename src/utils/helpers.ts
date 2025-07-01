import { UserRole, UserStatus } from '../types';

export function stringAvatar(name: string) {
  const safeName = name && name.trim() ? name : 'Unknown';
  const nameParts = safeName.split(' ').filter(part => part.length > 0);
  const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0];

  return {
    sx: {
      bgcolor: stringToColor(safeName),
      width: 40,
      height: 40,
    },
    children: initials,
  };
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return '#f44336';
    case UserRole.MODERATOR:
      return '#ff9800';
    case UserRole.USER:
      return '#4caf50';
    default:
      return '#9e9e9e';
  }
};

export const getStatusColor = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ACTIVE:
      return '#4caf50';
    case UserStatus.INACTIVE:
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};
