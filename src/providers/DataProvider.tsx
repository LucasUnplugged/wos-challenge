import { ReactNode, createContext, useEffect, useState } from 'react';
import { TabName, MemberData, MemberStatus, User } from '../types/stateTypes';
import { memberSorter } from '../utils/members';

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
    const controller = new AbortController();

    async function fetchData() {
      const signal = controller.signal;

      try {
        const response = await fetch('https://wos-challenge-api.onrender.com', {
          signal,
          headers: {
            authorization: 'Bearer undefined',
            'Target-Endpoint': 'https://front-end-code-challenge.stephenbuilds.workers.dev',
            'Target-URL': 'https://front-end-code-challenge.stephenbuilds.workers.dev',
          },
        });
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
      } catch (error) {
        console.log('Fetch error: ', error);
      }
    }
    fetchData();

    return () => {
      if (controller) {
        controller.abort('Re-fetching');
      }
    };
  }, []);

  return (
    <DataContext.Provider value={{ memberData, memberStatus, toggleAdmin, toggleDeleted, activeTab, setActiveTab }}>
      {children}
    </DataContext.Provider>
  );
}
