import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import storage from './utils/storage'
import { setAuthorizationHeader } from './api/client';
import { BrowserRouter } from 'react-router-dom';


const accessToken = storage.get('token');
if(accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App initiallyLogged={!!accessToken}/> 
    </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 // !!accessToken: doble negación -> convierte el string que nos llega a booleano
