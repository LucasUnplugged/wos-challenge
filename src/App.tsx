import { Helmet } from 'react-helmet';
import '@withneutron/quarks/styles';
import { getThemeFonts, token } from '@withneutron/quarks';
import { Grid, QuarksProvider } from '@withneutron/quarks-react';
import { DataProvider } from './providers/DataProvider';
import { Header } from './components/App/Header';
import { Body } from './components/App/Body';

const { links } = getThemeFonts();

function App() {
  return (
    <DataProvider>
      <QuarksProvider
        isDebugMode
        defaultColorMode='light'
        semanticColorOverrides={{
          primary: { hue: 240, saturation: 95 },
          secondary: { hue: 207, saturation: 95 },
          tertiary: { hue: 238, saturation: 12, isNeutral: true },
        }}
      >
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
          <Body />
        </Grid.Main>
      </QuarksProvider>
    </DataProvider>
  );
}

export default App;
