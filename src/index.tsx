import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from './libs/context/context';

const root = createRoot(document.getElementById("root")! as HTMLElement)

root.render(
  <React.StrictMode>
    <GlobalContext>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </GlobalContext>
  </React.StrictMode>
);
