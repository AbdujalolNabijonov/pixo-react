import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './libs/mui/material.theme';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById("root")! as HTMLElement)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
