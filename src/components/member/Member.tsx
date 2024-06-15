import { Column, FlexListItem, Heading, Image, Row, useColors } from '@withneutron/quarks-react';
import { User } from '../../types/stateTypes';
import { getLowShadow } from '@withneutron/quarks';
import { ReactNode } from 'react';

export function Member({
  children,
  member,
  isDeleted,
  isAnimating,
  badge,
}: {
  children?: ReactNode;
  member: User;
  isAdmin?: boolean;
  isDeleted?: boolean;
  isAnimating?: boolean;
  badge?: ReactNode;
}) {
  const { isDark } = useColors();
  return (
    <FlexListItem
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
          animation: isAnimating ? '$bounceRight' : undefined,
          animationIterationCount: '1',
        }}
      >
        <Image
          src={member.photo}
          height='40'
          width='40'
          css={{ radius: '$round', size: '$40', opacity: isDeleted ? '.5' : '1', transition: 'opacity .5s' }}
        />
        <Column>
          <Row
            css={{
              gap: '$8',
              alignItems: 'center',
            }}
          >
            <Heading
              as='h2'
              css={{
                typo: '$body',
                fontWeight: '$600',
                mb: '$0',
                opacity: isDeleted ? '.5' : '1',
                transition: 'opacity .5s',
              }}
            >
              {member.first} {member.last}
            </Heading>
            {badge}
          </Row>
          <Heading as='h3' css={{ typo: '$body', m: '$0', opacity: isDeleted ? '.5' : '1', transition: 'opacity .5s' }}>
            {member.role}
          </Heading>
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
        {children}
      </Row>
    </FlexListItem>
  );
}
Member.displayName = 'Member';
