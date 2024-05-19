import { useColors, Row } from '@withneutron/quarks-react';
import { Button } from '../Button';
import Logo from '../Logo';
import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';

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
        <Button hasIconOnly onClick={toggleColorMode}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Row.Nav>
    </Row.Header>
  );
}
Header.displayName = 'Header';
