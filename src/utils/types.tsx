export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface EmailUser {
  email: string;
}

export function isEmailUser(item: unknown): item is EmailUser {
  if ('firstName' in (item as EmailUser)) return false;
  if ('lastName' in (item as EmailUser)) return false;
  return (item as EmailUser).email !== undefined;
}

export function isUser(item: unknown): item is User {
  if (
    item &&
    'firstName' in (item as User) &&
    'lastName' in (item as User) &&
    'email' in (item as User)
  ) {
    return true;
  }
  return false;
}
