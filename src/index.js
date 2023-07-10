import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './AuthContext';
import { CountryCodeProvider } from './CountryCodeContext';
import { TrendingVdoProvider } from './trendingVdoContext';
import SearchDataContextProvider from './SearchDataContext';
import { UserDataContextProvider } from './UserDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
        <SearchDataContextProvider>
          <TrendingVdoProvider>
            <CountryCodeProvider>
      <UserDataContextProvider>
              <App />
      </UserDataContextProvider>
            </CountryCodeProvider>
          </TrendingVdoProvider>
        </SearchDataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

reportWebVitals();
