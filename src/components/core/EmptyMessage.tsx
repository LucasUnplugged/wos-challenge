import { Column, Text } from '@withneutron/quarks-react';
import { ReactNode } from 'react';

type EmptyMessageProps = {
  children: ReactNode;
};

export function EmptyMessage({ children }: EmptyMessageProps) {
  return (
    <Column css={{ alignItems: 'center', justifyContent: 'center', p: '$16', minHeight: '72px' }}>
      <Text>{children}</Text>
    </Column>
  );
}
EmptyMessage.displayName = 'EmptyMessage';
