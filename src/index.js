import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './AuthContext';
import { CountryCodeProvider } from './CountryCodeContext';
import { TrendingVdoProvider } from './trendingVdoContext';
import { QueryClient, QueryClientProvider } from 'react-query'
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
        <TrendingVdoProvider>
          <CountryCodeProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
          </CountryCodeProvider>
        </TrendingVdoProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register() ;
// reportWebVitals();
