import { useContext } from 'react';
import { DataContext } from '../providers/DataProvider';

export function useData() {
  const { memberData, memberStatus, toggleAdmin, toggleDeleted, activeTab, setActiveTab } = useContext(DataContext);
  return { memberData, memberStatus, toggleAdmin, toggleDeleted, activeTab, setActiveTab };
}
