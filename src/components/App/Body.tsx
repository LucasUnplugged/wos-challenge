import { Column, FlexList, FlexListItem } from '@withneutron/quarks-react';
import { useData } from '../../hooks/useData';
import { tabList } from '../../utils/tabs';
import { token } from '@withneutron/quarks';
import { MemberList } from '../MemberList';
import { TabButton } from '../TabButton';

export function Body() {
  const { activeTab, setActiveTab } = useData();

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
              <TabButton isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
                {title}
              </TabButton>
            </FlexListItem>
          ))}
        </FlexList>
        <Column css={{ p: { base: '$16', xs: '$12' } }}>
          <MemberList />
        </Column>
      </Column>
    </Column>
  );
}
Body.displayName = 'Body';
