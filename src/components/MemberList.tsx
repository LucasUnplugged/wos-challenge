import { Column, FlexList, Heading, Row } from '@withneutron/quarks-react';
import { EmptyMessage } from './EmptyMessage';
import { LoaderIcon } from './Icons/LoaderIcon';
import { ReactNode } from 'react';

export const MemberList = ({
  children,
  title,
  emptyMessage,
  isLoading,
  isPadded,
}: {
  children: ReactNode;
  title?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  isPadded?: boolean;
}) => {
  return (
    <>
      {title && <Heading.H2 css={{ typo: '$minorHeading' }}>{title}</Heading.H2>}
      <FlexList css={{ flexDirection: 'column', gap: { base: '$8', xs: '$6' } }}>{children}</FlexList>
      {(isLoading || emptyMessage) && (
        <Column css={{ alignItems: 'center', justifyContent: 'center', p: isPadded ? '$40' : undefined }}>
          {isLoading && (
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
          )}
          {emptyMessage && <EmptyMessage>{isLoading ? 'Loading…' : emptyMessage}</EmptyMessage>}
        </Column>
      )}
    </>
  );
};
MemberList.displayName = 'MemberList';
