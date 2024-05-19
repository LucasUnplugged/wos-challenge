import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { TabName, MemberData, MemberStatus, User } from '../types/stateTypes';

type DataContextProps = {
  activeTab: TabName;
  memberData: MemberData;
  memberStatus: MemberStatus;
  setActiveTab: (tabName: TabName) => void;
  toggleAdmin: (id: string, onToggleOn?: () => void) => void;
  toggleDeleted: (id: string) => void;
};

export const DataContext = createContext({
  activeTab: 'members',
  memberData: [],
  memberStatus: {},
  setActiveTab: () => undefined,
  toggleAdmin: () => undefined,
  toggleDeleted: () => undefined,
} as DataContextProps);

export function DataProvider({ children }: { children: ReactNode }) {
  const controller = useRef<AbortController | null>(null);
  const [activeTab, setActiveTab] = useState<TabName>('members');
  const [memberData, setMemberData] = useState<MemberData>([]);
  const [memberStatus, setMemberStatus] = useState<MemberStatus>({});

  const toggleAdmin = (id: string, onToggleOn?: () => void) => {
    setMemberStatus((members) => {
      const isAdmin = !members[id].isAdmin;
      if (isAdmin && onToggleOn) {
        onToggleOn();
      }
      return {
        ...members,
        [id]: {
          ...members[id],
          isAdmin,
        },
      };
    });
  };
  const toggleDeleted = (id: string) => {
    setMemberStatus((members) => {
      return {
        ...members,
        [id]: {
          ...members[id],
          isDeleted: !members[id].isDeleted,
        },
      };
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (controller.current) {
        controller.current.abort('Re-fetching');
      }

      controller.current = new AbortController();
      const signal = controller.current.signal;

      try {
        const response = await fetch('api', { signal });
        const data: { users: Record<string, User> } = await response.json();

        const memberStatus: MemberStatus = {};
        const members = Object.entries(data.users).sort(memberSorter);

        members.forEach((member) => {
          memberStatus[member[0]] = {
            isAdmin: false,
            isDeleted: false,
          };
        });

        setMemberData(members);
        setMemberStatus(memberStatus);
        controller.current = null;
      } catch (error) {
        console.log('Fetch error: ', error);
        controller.current = null;
      }
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ memberData, memberStatus, toggleAdmin, toggleDeleted, activeTab, setActiveTab }}>
      {children}
    </DataContext.Provider>
  );
}

function memberSorter([, a]: [string, User], [, b]: [string, User]) {
  if (a.first < b.first) {
    return -1;
  }
  if (a.first > b.first) {
    return 1;
  }
  return 0;
}
