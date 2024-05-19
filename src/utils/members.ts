import { User } from '../types/stateTypes';

export function memberSorter([, a]: [string, User], [, b]: [string, User]) {
  if (a.first < b.first) {
    return -1;
  }
  if (a.first > b.first) {
    return 1;
  }
  return 0;
}
