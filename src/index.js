import React from 'react';
import ReactDOM from 'react-dom';
import './reset.scss';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.js';
import * as serviceWorker from './serviceWorker';
import { OrdersProvider } from './contexts/orders';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <OrdersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OrdersProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
