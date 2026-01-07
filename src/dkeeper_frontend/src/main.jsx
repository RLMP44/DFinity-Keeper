import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log('created root')

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
