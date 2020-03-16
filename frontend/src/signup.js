import React from 'react';
import ReactDOM from 'react-dom';
import Nb from './components/App';
import SignUp from './components/signup.components'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<SignUp />, document.getElementById('sign_up'));