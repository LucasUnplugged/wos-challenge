import { Column, FlexList, FlexListItem } from '@withneutron/quarks-react';
import { tabList } from '../../utils/tabs';
import { token } from '@withneutron/quarks';
import { TabButton } from '../TabButton';
import { ReactNode } from 'react';
import { TabName } from '../../types/stateTypes';

export function Body({
  children,
  activeTab,
  setActiveTab,
}: {
  children: ReactNode;
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
}) {
  return (
    <Column css={{ p: { base: '$20', xs: '$12' } }}>
      <Column css={{ bg: '$tertiary1', radius: '$8', boxShadow: '$low' }}>
        <FlexList
          css={{
            bg: '$min',
            flexDirection: 'row',
            boxShadow: `0 -3px 0 0 inset ${token.color.$tertiary3}`,
            radiusTop: '$8',
            overflow: 'hidden',
          }}
        >
          {tabList.map(([tab, title]) => (
            <FlexListItem key={tab}>
              <TabButton
                isActive={activeTab === tab}
                aria-description={`Tab "${title}" is ${activeTab === tab ? 'selected' : 'not selected'}`}
                onClick={() => setActiveTab(tab)}
              >
                {title}
              </TabButton>
            </FlexListItem>
          ))}
        </FlexList>
        <Column css={{ p: { base: '$16', xs: '$12' } }}>{children}</Column>
      </Column>
    </Column>
  );
}
Body.displayName = 'Body';
