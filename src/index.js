import axios from 'axios';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';

const lang = localStorage.getItem('lang') || 'en';
axios.defaults.baseURL = 'http://localhost/api/';
axios.defaults.headers.common['Accept-Language'] = lang;
axios.defaults.withCredentials = true;
i18next.changeLanguage(lang);
document.documentElement.lang = lang;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);