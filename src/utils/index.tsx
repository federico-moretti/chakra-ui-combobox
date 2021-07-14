import { EmailUser, isUser, User } from './types';

export function isEmailRegex(email: string): boolean {
  const regex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
  return regex.test(email);
}

export function userToString(item: User | EmailUser | null): string {
  if (!item) return '';
  if (isUser(item)) return item.firstName;
  return item.email;
}

export function getUserEmail(item: User | EmailUser | null): string | null {
  if (!item) return null;
  return item.email;
}
