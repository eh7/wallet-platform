// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './AppData';

const root = ReactDOM.createRoot(document.getElementById('App'));
root.render(
  <BrowserRouter>
     <App />
  </BrowserRouter>
);
/*
root.render(
 <React.StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
 </React.StrictMode>
);
*/
