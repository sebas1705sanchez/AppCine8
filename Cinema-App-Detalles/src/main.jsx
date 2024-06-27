import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/details.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <input></input>
    <App />
  </React.StrictMode>
);
