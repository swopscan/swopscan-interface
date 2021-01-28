import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: 'Inter', sans-serif;;
    font-display: fallback;
  }
  @supports (font-variation-settings: normal) {
    html, body {
      font-family: 'Inter var', sans-serif;
    }
  }
  body {
    margin: 0;
    padding: 0;
    padding-top: 2em;
  }
`;