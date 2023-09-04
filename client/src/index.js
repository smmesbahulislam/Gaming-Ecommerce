import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/AuthStyle.css'



import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';
import { Provider } from 'react-redux';
import store from './reduxToolkit/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </Provider>
);


