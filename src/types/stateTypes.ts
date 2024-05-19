import { tabs } from '../utils/tabs';

export type TabName = keyof typeof tabs;
export type TabTitle = (typeof tabs)[TabName];

export type Tab = {
  title: string;
};

export type User = {
  first: string;
  last: string;
  photo: string;
  role: 'Engineering' | 'Developer Experience' | 'CTO' | 'Design';
};

export type MappedUser = User & {
  id: string;
};

type UserStatus = {
  isAdmin: boolean;
  isDeleted: boolean;
};

export type MemberData = [string, User][];
export type MemberStatus = Record<string, UserStatus>;
