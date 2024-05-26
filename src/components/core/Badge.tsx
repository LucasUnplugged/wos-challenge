import { styled } from '@withneutron/quarks-react';

export const Badge = styled(
  'span',
  {
    bg: '$tertiary4',
    color: '$tertiaryText4',
    radius: '$pill',
    px: '$8',
    py: '$2',
    typo: '$caption',
    fontSize: '$12',
  },
  {
    isDeleted: {
      true: {
        bg: '$error4',
        color: '$errorText4',
      },
    },
  },
);
