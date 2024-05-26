import { token } from '@withneutron/quarks';
import { styled } from '@withneutron/quarks-react';

export const TabButton = styled(
  'button',
  {
    typo: '$body',
    fontWeight: '$600',
    bg: 'transparent',
    color: '$primary9',
    border: 'none',
    radius: '$0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '$24',
    py: '$20',
    w: 'max-content',
    minWidth: '$80',
    ':interact': {
      bg: '$primary9',
      color: '$primaryText9',
      boxShadow: `0 -3px 0 0 inset ${token.color.$primary9}`,
    },
  },
  {
    isActive: {
      true: {
        boxShadow: `0 -3px 0 0 inset ${token.color.$primary9}`,
      },
    },
  },
  'TabButton',
);
