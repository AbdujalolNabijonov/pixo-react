import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from './libs/context/context';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DATA_REFETCH_TIME } from './libs/config';

const root = createRoot(document.getElementById("root")! as HTMLElement)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000 * DATA_REFETCH_TIME,
      refetchOnWindowFocus: false
    }
  }
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContext>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </GlobalContext>
    </QueryClientProvider>
  </React.StrictMode>
);
