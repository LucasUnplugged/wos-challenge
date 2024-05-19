import { Column, Heading, Row } from '@withneutron/quarks-react';
import { useData } from '../hooks/useData';
import { EmptyMessage } from './EmptyMessage';
import { LoaderIcon } from './Icons/LoaderIcon';
import { Members } from './Members';
import { User } from '../types/stateTypes';

export const MemberList = () => {
  const { activeTab, memberData, memberStatus } = useData();
  const isGroupsTab = activeTab === 'groups';
  let admin: [string, User][] = [];
  let standard: [string, User][] = [];

  if (isGroupsTab) {
    admin = memberData.filter(([id]) => memberStatus[id].isAdmin);
    standard = memberData.filter(([id]) => !memberStatus[id].isAdmin);
  }

  return isGroupsTab ? (
    <>
      <Heading.H2 css={{ typo: '$minorHeading' }}>Admin</Heading.H2>
      {!admin.length ? (
        <EmptyMessage>There are no users in this section</EmptyMessage>
      ) : (
        <Members members={admin} isGroupsTab={isGroupsTab} />
      )}
      <Heading.H2 css={{ typo: '$minorHeading' }}>Standard</Heading.H2>
      {!standard.length ? (
        <EmptyMessage>There are no users in this section</EmptyMessage>
      ) : (
        <Members members={standard} isGroupsTab={isGroupsTab} />
      )}
    </>
  ) : !memberData.length ? (
    <Column css={{ alignItems: 'center', justifyContent: 'center', p: '$40' }}>
      <Row
        css={{
          animation: '$spinAndPause',
          size: '$40',
          color: '$primary9',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoaderIcon />
      </Row>
      <EmptyMessage>Loading users…</EmptyMessage>
    </Column>
  ) : (
    <Members members={memberData} isGroupsTab={isGroupsTab} />
  );
};
MemberList.displayName = 'MemberList';
