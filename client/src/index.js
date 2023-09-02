import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/AuthStyle.css'



import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>

);


