import React from 'react';
import ReactDOM from 'react-dom';
import "./root/root";
import App from './App'
import "@config/configureMobX"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


