import { useColors, Row } from '@withneutron/quarks-react';
import { Button } from '../core/Button';
import Logo from '../core/Logo';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

export function Header() {
  const { isDark, toggleColorMode } = useColors();
  return (
    <Row.Header
      css={{
        bg: '$min',
        boxShadow: '$low',
        px: '$40',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '$16',
        xs: {
          px: '$24',
          py: '$12',
        },
      }}
    >
      <Logo />
      <Row.Nav css={{ gap: '$32', alignItems: 'center' }}>
        <Button
          hasIconOnly
          onClick={toggleColorMode}
          aria-label={isDark ? 'Change to light mode' : 'Change to dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Row.Nav>
    </Row.Header>
  );
}
Header.displayName = 'Header';
