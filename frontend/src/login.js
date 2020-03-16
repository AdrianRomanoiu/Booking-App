import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login.components'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<BrowserRouter> <Login /> </BrowserRouter>, document.getElementById('log_in'));