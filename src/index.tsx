import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BRAND} from './constants';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.clear();
console.log(`%cWHOA! You like trails AND you know you're way around the console?\nYou should be working for us at `, 'font-family:monospace; font-size: 20px')
console.log(`%cAllTrails`, `color:${BRAND.Primary}; font-family:monospace; font-size: 30px`);
console.log('https://www.alltrails.com/careers');