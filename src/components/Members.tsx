import { Column, FlexList, FlexListItem, Heading, Image, Row, useColors } from '@withneutron/quarks-react';
import { useData } from '../hooks/useData';
import { Button } from './Button';
import { CheckedIcon } from './Icons/CheckedIcon';
import { UncheckedIcon } from './Icons/UncheckedIcon';
import { UndoIcon } from './Icons/UndoIcon';
import { DeleteIcon } from './Icons/DeleteIcon';
import { Badge } from './Badge';
import { User } from '../types/stateTypes';
import { getLowShadow } from '@withneutron/quarks';
import { useAnimationState } from '../hooks/useAnimationState';

type MembersProps = {
  members: [string, User][];
  isGroupsTab?: boolean;
};

export function Members({ members, isGroupsTab }: MembersProps) {
  const { isDark } = useColors();
  const { animationName, animate } = useAnimationState();
  const { memberStatus, toggleAdmin, toggleDeleted } = useData();

  return (
    <FlexList css={{ flexDirection: 'column', gap: { base: '$8', xs: '$6' } }}>
      {members.map(([id, member]) => {
        const { isAdmin, isDeleted } = memberStatus[id];
        return (
          <FlexListItem
            key={id}
            role='article'
            css={{
              bg: '$min',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              radius: '$6',
              gap: '$12',
              p: '$16',
              boxShadow: isDark ? getLowShadow('0 0% 30%') : getLowShadow('0 0% 70%'),
              xs: {
                gap: '$8',
                p: '$12',
              },
            }}
          >
            <Row
              css={{
                gap: { base: '$12', xs: '$8' },
                animation: isAdmin ? animationName[id] : undefined,
                animationIterationCount: '1',
              }}
            >
              <Image
                src={member.photo}
                css={{ radius: '$round', size: '$40', opacity: isDeleted ? '.5' : '1', transition: 'all .5s' }}
              />
              <Column>
                <Row
                  css={{
                    gap: '$8',
                    alignItems: 'center',
                  }}
                >
                  <Heading.H1
                    css={{
                      typo: '$body',
                      fontWeight: '$600',
                      mb: '$0',
                      opacity: isDeleted ? '.5' : '1',
                      transition: 'all .5s',
                    }}
                  >
                    {member.first} {member.last}
                  </Heading.H1>
                  {isDeleted && <Badge isDeleted>Deleted</Badge>}
                  {isAdmin && !isDeleted && !isGroupsTab && <Badge css={{ xs: { display: 'none' } }}>Admin</Badge>}
                </Row>
                <Heading.H2 css={{ typo: '$body', m: '$0', opacity: isDeleted ? '.5' : '1', transition: 'all .5s' }}>
                  {member.role}
                </Heading.H2>
              </Column>
            </Row>
            <Row
              css={{
                gap: '$16',
                xs: {
                  gap: '$4',
                  flexDirection: 'column',
                },
              }}
            >
              <Button
                hasPrefixIcon
                isDisabled={isDeleted}
                disabled={isDeleted}
                variant='ghost'
                onClick={() => toggleAdmin(id, () => animate(id, '$bounceRight'))}
              >
                {isAdmin ? <CheckedIcon /> : <UncheckedIcon />}
                Admin
              </Button>
              <Button hasPrefixIcon variant='ghost' onClick={() => toggleDeleted(id)} css={{ minWidth: '98px' }}>
                {isDeleted ? <UndoIcon /> : <DeleteIcon />}
                {isDeleted ? 'Restore' : 'Delete'}
              </Button>
            </Row>
          </FlexListItem>
        );
      })}
    </FlexList>
  );
}
Members.displayName = 'Members';
