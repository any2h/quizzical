import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import styled, { createGlobalStyle } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    color: #293264;
    background-color: #F5F7FB;
  }

  h1, h3 {
    font-family: 'Karla', sans-serif;
  }

  #root {
    overflow: hidden;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
