import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

const theme = {
  colors: {
    main: '#3cb371',
    secondary: '#F96353',
    blue: '#0055FF'
  },
  mediaQueries: {
    main: {
      singleCol: 'only screen and (max-width: 45.24em)',
      adjust: 'only screen and (max-width: 33em)'
    }
  }
};

export default function ThemeProvider({children}) {
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
};