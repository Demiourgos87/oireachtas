import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@mui/material';

import App from './App.tsx';
import './styles/global.css';
import theme from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
