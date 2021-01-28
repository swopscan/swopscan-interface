import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'inter-ui';

import { GlobalStyle } from './theme/GlobalStyle.js';
import ThemeProvider from './theme';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
