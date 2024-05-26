import { styled } from '@withneutron/quarks-react';

export const Button = styled(
  'button',
  {
    typo: '$body',
    fontWeight: '$600',
    bg: 'transparent',
    color: '$primary9',
    border: '$primary',
    borderColor: 'transparent',
    radius: '$4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '$12',
    py: '$4',
    w: 'max-content',
    minWidth: '$80',
    ':interact': {
      bg: '$primary9',
      color: '$primaryText9',
    },
    ':focus': {
      outline: '$primaryMax',
    },
  },
  {
    hasIconOnly: {
      true: {
        fontSize: '$18',
        lineHeight: '$min',
        size: '$32',
        minWidth: 'unset',
        p: '$4',
      },
    },
    hasPrefixIcon: {
      true: {
        px: '$8',
        gap: '$8',
        justifyContent: 'start',
        xs: {
          px: '$6',
          py: '$4',
          gap: '$6',
          minWidth: '$0',
        },
      },
    },
    variant: {
      solid: {
        bg: '$primary9',
        color: '$primaryText9',
        ':interact': {
          bg: '$primary10',
          color: '$primaryText10',
        },
      },
      outline: {
        bg: '$minAlpha9',
        color: '$primary9',
        borderColor: '$primary',
        ':interact': {
          bg: '$primary10',
          color: '$primaryText10',
          borderColor: '$primaryMax',
        },
      },
      ghost: {
        bg: 'transparent',
        color: '$primary9',
        ':interact': {
          bg: '$primary10',
          color: '$primaryText10',
        },
      },
      subtle: {
        bg: '$primaryAlpha2',
        color: '$primaryAlphaText2',
        ':interact': {
          bg: '$primary10',
          color: '$primaryText10',
        },
      },
    },
    isDisabled: {
      true: {
        color: '$tertiary8',
        ':interact': {
          bg: 'transparent',
          color: '$tertiary8',
          outline: 'none',
        },
      },
    },
  },
  'Button',
);
