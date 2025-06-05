import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App';
import './assets/styles/main.css';

const container = document.getElementById('app');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);