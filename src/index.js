import 'bootstrap/dist/css/bootstrap.min.css';
import "./vendor/normalize.css"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";

window.axios = axios;
axios.defaults.baseURL = 'https://apelio.khonik.online/api';
axios.interceptors.response.use(response => response, error => {
    if (error.response) {
        if (error.response.status === 403) {
            localStorage.removeItem('api_token')
            window.location.href='/';
            return
        }

    }
    return Promise.reject(error)
})


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
