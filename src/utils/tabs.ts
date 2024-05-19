import { TabName, TabTitle } from '../types/stateTypes';

export const tabs = {
  members: 'Members',
  groups: 'Groups',
} as const;

export const tabList = Object.entries(tabs).map(([value, tabTitle]) => {
  const tabName = value as TabName;
  return [tabName, tabTitle];
}) as [TabName, TabTitle][];
