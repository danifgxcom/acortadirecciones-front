import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './AuthContext';
import Header from './Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <Header />
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
