import { Helmet } from 'react-helmet';
import '@withneutron/quarks/styles';
import { getThemeFonts, token } from '@withneutron/quarks';
import { Grid, QuarksProvider } from '@withneutron/quarks-react';
import { Header } from './components/App/Header';
import { Body } from './components/App/Body';
import { useTabs } from './hooks/useTabs';
import { useData } from './hooks/useData';
import { MemberList } from './components/MemberList';
import { User } from './types/stateTypes';
import { Member } from './components/Member';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { CheckedIcon } from './components/Icons/CheckedIcon';
import { DeleteIcon } from './components/Icons/DeleteIcon';
import { UncheckedIcon } from './components/Icons/UncheckedIcon';
import { UndoIcon } from './components/Icons/UndoIcon';
import { useAnimationState } from './hooks/useAnimationState';

const { links } = getThemeFonts();

function App() {
  const { memberData, memberStatus, toggleAdmin, toggleDeleted } = useData();
  const { activeTab, setActiveTab } = useTabs();
  const { isAnimating, animate } = useAnimationState();

  const isLoading = !memberData.length;
  const isGroupsTab = activeTab === 'groups';
  let admin: [string, User][] = [];
  let standard: [string, User][] = [];

  if (isGroupsTab) {
    admin = memberData.filter(([id]) => memberStatus[id].isAdmin);
    standard = memberData.filter(([id]) => !memberStatus[id].isAdmin);
  }

  const getMember = ([id, member]: [string, User]) => {
    const { isAdmin, isDeleted } = memberStatus[id];
    return (
      <Member
        key={id}
        member={member}
        isAnimating={!isGroupsTab && isAdmin && isAnimating[id]}
        isDeleted={isDeleted}
        badge={
          <>
            {isDeleted && <Badge isDeleted>Deleted</Badge>}
            {isAdmin && !isDeleted && !isGroupsTab && <Badge css={{ xs: { display: 'none' } }}>Admin</Badge>}
          </>
        }
      >
        <Button
          hasPrefixIcon
          isDisabled={isDeleted}
          disabled={isDeleted}
          variant='ghost'
          aria-label={isAdmin ? "Revoke user's admin status" : 'Give user admin status'}
          onClick={() => toggleAdmin(id, () => !isGroupsTab && animate(id))}
        >
          {isAdmin ? <CheckedIcon /> : <UncheckedIcon />}
          Admin
        </Button>
        <Button hasPrefixIcon variant='ghost' onClick={() => toggleDeleted(id)} css={{ minWidth: '98px' }}>
          {isDeleted ? <UndoIcon /> : <DeleteIcon />}
          {isDeleted ? 'Restore' : 'Delete'}
        </Button>
      </Member>
    );
  };

  return (
    <QuarksProvider defaultColorMode='light'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>WorkOS Challenge</title>
        {links.map((props, key) => (
          <link key={key} {...props} />
        ))}
      </Helmet>
      <Grid.Main
        css={{
          w: '100vw',
          minHeight: '100vh',
          gtRows: `${token.size.$80} 1fr`,
          bg: '$tertiary3',
          xs: {
            gtRows: `auto 1fr`,
          },
        }}
      >
        <Header />
        <Body activeTab={activeTab} setActiveTab={setActiveTab}>
          {isGroupsTab ? (
            <>
              <MemberList
                isLoading={isLoading}
                title='Admin'
                emptyMessage={!admin.length ? 'There are no users in this section' : ''}
              >
                {admin.map(getMember)}
              </MemberList>
              <MemberList
                isLoading={isLoading}
                title='Standard'
                emptyMessage={!standard.length ? 'There are no users in this section' : ''}
              >
                {standard.map(getMember)}
              </MemberList>
            </>
          ) : (
            <MemberList
              isPadded
              isLoading={isLoading}
              emptyMessage={!memberData.length ? 'There are no users in this section' : ''}
            >
              {memberData.map(getMember)}
            </MemberList>
          )}
        </Body>
      </Grid.Main>
    </QuarksProvider>
  );
}

export default App;
