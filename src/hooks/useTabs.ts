import { useState } from 'react';
import { TabName } from '../types/stateTypes';

export function useTabs() {
  const [activeTab, setActiveTab] = useState<TabName>('members');
  return { activeTab, setActiveTab };
}
